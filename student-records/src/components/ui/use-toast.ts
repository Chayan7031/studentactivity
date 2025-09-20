// Simple toast implementation - you can replace this with a more sophisticated toast library
import { useState, useCallback } from 'react'

interface Toast {
  id: string
  title: string
  description?: string
  variant?: 'default' | 'destructive'
}

let toastId = 0

export function useToast() {
  const toast = useCallback((toast: Omit<Toast, 'id'>) => {
    // For now, we'll use browser alerts - you can replace this with a proper toast library
    if (toast.variant === 'destructive') {
      alert(`Error: ${toast.title}\n${toast.description || ''}`)
    } else {
      alert(`${toast.title}\n${toast.description || ''}`)
    }
  }, [])

  return { toast }
}