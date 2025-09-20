import { writeFile, mkdir } from 'fs/promises';
import { existsSync } from 'fs';
import path from 'path';

export class FileHandler {
  private static UPLOAD_DIR = 'uploads';
  private static MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
  private static ALLOWED_TYPES = [
    'application/pdf',
    'image/jpeg',
    'image/jpg', 
    'image/png',
    'image/webp'
  ];

  static async uploadCertificate(
    file: File, 
    studentId: string, 
    certificateTitle: string
  ): Promise<{ filePath: string; fileSize: number; fileType: string }> {
    try {
      // Validate file
      this.validateFile(file);

      // Create unique filename
      const timestamp = Date.now();
      const sanitizedTitle = certificateTitle.replace(/[^a-zA-Z0-9]/g, '_').substring(0, 50);
      const fileExtension = path.extname(file.name);
      const fileName = `${studentId}_${sanitizedTitle}_${timestamp}${fileExtension}`;
      
      // Create upload directory structure
      const studentUploadDir = path.join(process.cwd(), 'public', this.UPLOAD_DIR, 'certificates', studentId);
      const filePath = path.join(studentUploadDir, fileName);
      const publicPath = `/uploads/certificates/${studentId}/${fileName}`;

      // Ensure directory exists
      await this.ensureDirectoryExists(studentUploadDir);

      // Convert file to buffer and write
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);
      
      await writeFile(filePath, buffer);

      return {
        filePath: publicPath,
        fileSize: file.size,
        fileType: file.type
      };
    } catch (error) {
      console.error('Error uploading file:', error);
      throw error;
    }
  }

  private static validateFile(file: File): void {
    // Check file size
    if (file.size > this.MAX_FILE_SIZE) {
      throw new Error(`File size exceeds ${this.MAX_FILE_SIZE / (1024 * 1024)}MB limit`);
    }

    // Check file type
    if (!this.ALLOWED_TYPES.includes(file.type)) {
      throw new Error(`File type ${file.type} is not allowed. Allowed types: ${this.ALLOWED_TYPES.join(', ')}`);
    }

    // Check if file is empty
    if (file.size === 0) {
      throw new Error('File cannot be empty');
    }
  }

  private static async ensureDirectoryExists(dirPath: string): Promise<void> {
    if (!existsSync(dirPath)) {
      await mkdir(dirPath, { recursive: true });
    }
  }

  static getFileExtension(filename: string): string {
    return path.extname(filename).toLowerCase();
  }

  static isImageFile(fileType: string): boolean {
    return fileType.startsWith('image/');
  }

  static isPdfFile(fileType: string): boolean {
    return fileType === 'application/pdf';
  }

  static formatFileSize(bytes: number): string {
    if (bytes === 0) return '0 Bytes';
    
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }

  static async deleteFile(filePath: string): Promise<void> {
    try {
      const fs = require('fs').promises;
      const fullPath = path.join(process.cwd(), 'public', filePath);
      await fs.unlink(fullPath);
    } catch (error) {
      console.error('Error deleting file:', error);
      // Don't throw error for file deletion failures
    }
  }
}