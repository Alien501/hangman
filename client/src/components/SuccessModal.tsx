import { useTranslation } from 'react-i18next'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog'
import { Button } from './ui/button'
import type { Word } from '@/types/api'

interface SuccessModalProps {
  isOpen: boolean
  onContinue: () => void
  onQuit: () => void
  wordData?: Word | null
}

export default function SuccessModal({
  isOpen,
  onContinue,
  onQuit,
  wordData,
}: SuccessModalProps) {
  const { t } = useTranslation()

  return (
    <Dialog open={isOpen} onOpenChange={() => {}}>
      <DialogContent
        showCloseButton={false}
        className="rounded-none max-w-[320px] max-h-[90vh] overflow-y-auto border-4 border-black shadow-[6px_6px_0px_#000] p-4 sm:p-6 bg-green-100"
      >
        <DialogHeader className="text-center space-y-3">
          <div className="flex justify-center">
            <div className="w-12 h-12 sm:w-16 sm:h-16 border-4 border-black shadow-[4px_4px_0px_#000] bg-green-400 flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-black sm:w-8 sm:h-8"
              >
                <path d="M20 6L9 17l-5-5" />
              </svg>
            </div>
          </div>
          <DialogTitle className="text-xl sm:text-2xl font-bold text-black">
            {t('modal.congratulations')}
          </DialogTitle>
          <div className="space-y-2">
            <p className="text-base sm:text-lg font-semibold text-black">
              {t('modal.wordFound')}
            </p>
            {wordData && (
              <div className="bg-white border-2 border-black shadow-[3px_3px_0px_#000] p-2 sm:p-3 space-y-1">
                <p className="text-lg sm:text-xl font-bold text-black">
                  {wordData.word}
                </p>
                <p className="text-xs sm:text-sm text-gray-700">
                  {wordData.meaning}
                </p>
                <p className="text-xs text-gray-600">
                  {wordData.pronouncination}
                </p>
              </div>
            )}
            <p className="text-xs sm:text-sm text-gray-700">
              {t('modal.continueQuestion')}
            </p>
          </div>
        </DialogHeader>
        <div className="flex gap-2 sm:gap-3 mt-4 sm:mt-6">
          <Button
            onClick={onQuit}
            className="flex-1 rounded-none bg-red-400 text-black border-2 border-black shadow-[3px_3px_0px_#000] hover:shadow-[0px_0px_0px_#000] hover:bg-red-600 font-semibold text-xs sm:text-sm"
          >
            {t('modal.quit')}
          </Button>
          <Button
            onClick={onContinue}
            className="flex-1 rounded-none bg-green-400 text-black border-2 border-black shadow-[3px_3px_0px_#000] hover:shadow-[0px_0px_0px_#000] hover:bg-green-600 font-semibold text-xs sm:text-sm"
          >
            {t('modal.continue')}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
