import React from 'react'
import { AlertTriangle, CheckCircle, Info, AlertCircle, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

interface ConfirmDialogProps {
  open: boolean
  onClose: () => void
  onConfirm: () => void
  title: string
  message: string
  type?: 'warning' | 'success' | 'info' | 'error'
  confirmText?: string
  cancelText?: string
}

const ConfirmDialog: React.FC<ConfirmDialogProps> = ({
  open,
  onClose,
  onConfirm,
  title,
  message,
  type = 'warning',
  confirmText = 'Onayla',
  cancelText = 'İptal'
}) => {
  if (!open) return null

  const getIcon = () => {
    switch (type) {
      case 'success':
        return <CheckCircle className="w-6 h-6 text-green-500" />
      case 'info':
        return <Info className="w-6 h-6 text-blue-500" />
      case 'error':
        return <AlertCircle className="w-6 h-6 text-red-500" />
      default:
        return <AlertTriangle className="w-6 h-6 text-yellow-500" />
    }
  }

  const getConfirmButtonVariant = () => {
    switch (type) {
      case 'success':
        return 'default'
      case 'error':
        return 'destructive'
      default:
        return 'default'
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="flex flex-row items-center space-y-0 space-x-3">
          {getIcon()}
          <div className="flex-1">
            <CardTitle>{title}</CardTitle>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="w-4 h-4" />
          </Button>
        </CardHeader>
        <CardContent>
          <CardDescription className="text-base">{message}</CardDescription>
        </CardContent>
        <div className="flex justify-end space-x-2 p-6 pt-0">
          <Button variant="outline" onClick={onClose}>
            {cancelText}
          </Button>
          <Button variant={getConfirmButtonVariant()} onClick={onConfirm}>
            {confirmText}
          </Button>
        </div>
      </Card>
    </div>
  )
}

export default ConfirmDialog