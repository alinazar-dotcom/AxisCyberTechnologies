'use client';

import { Modal } from './Modal';
import { Button } from './Button';
import { AlertTriangle } from 'lucide-react';

interface ConfirmationModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    title: string;
    message: string;
    confirmText?: string;
    cancelText?: string;
    variant?: 'danger' | 'warning' | 'info';
}

export function ConfirmationModal({
    isOpen,
    onClose,
    onConfirm,
    title,
    message,
    confirmText = 'Confirm',
    cancelText = 'Cancel',
    variant = 'danger',
}: ConfirmationModalProps) {
    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title={title}
            size="sm"
            footer={
                <div className="flex justify-end gap-3">
                    <Button
                        variant="secondary"
                        onClick={onClose}
                    >
                        {cancelText}
                    </Button>
                    <Button
                        variant="primary"
                        className={variant === 'danger' ? '!bg-red-500 hover:!bg-red-600 !border-red-400 shadow-[0_0_15px_rgba(239,68,68,0.3)]' : ''}
                        onClick={() => {
                            onConfirm();
                            onClose();
                        }}
                    >
                        {confirmText}
                    </Button>
                </div>
            }
        >
            <div className="flex items-start gap-4">
                <div className={`p-3 rounded-full shrink-0 ${variant === 'danger' ? 'bg-red-500/10 text-red-500' :
                    variant === 'warning' ? 'bg-yellow-500/10 text-yellow-500' :
                        'bg-blue-500/10 text-blue-500'
                    }`}>
                    <AlertTriangle className="w-6 h-6" />
                </div>
                <div className="flex-1">
                    <p className="text-white/80 leading-relaxed">
                        {message}
                    </p>
                </div>
            </div>
        </Modal>
    );
}
