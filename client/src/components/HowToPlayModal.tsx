import { useTranslation } from 'react-i18next'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog'
import { Button } from './ui/button'

interface HowToPlayModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function HowToPlayModal({
  isOpen,
  onClose,
}: HowToPlayModalProps) {
  const { t } = useTranslation()

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent
        showCloseButton={false}
        className="rounded-none max-w-[400px] max-h-[90vh] overflow-y-auto border-4 border-black shadow-[6px_6px_0px_#000] p-4 sm:p-6 bg-blue-100"
      >
        <DialogHeader className="text-center space-y-3">
          <div className="flex justify-center">
            <div className="w-12 h-12 sm:w-16 sm:h-16 border-4 border-black shadow-[4px_4px_0px_#000] bg-blue-400 flex items-center justify-center">
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
                <circle cx="12" cy="12" r="10" />
                <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
                <path d="M12 17h.01" />
              </svg>
            </div>
          </div>
          <DialogTitle className="text-xl sm:text-2xl font-bold text-black">
            {t('howToPlay.title')}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-3 mt-4">
          <div className="bg-white border-2 border-black shadow-[3px_3px_0px_#000] p-3 sm:p-4 space-y-3">
            <div className="space-y-1">
              <h3 className="text-base sm:text-lg font-bold text-black">
                {t('howToPlay.objective')}
              </h3>
              <p className="text-xs sm:text-sm text-gray-700">
                {t('howToPlay.objectiveDescription')}
              </p>
            </div>

            <div className="space-y-1">
              <h3 className="text-base sm:text-lg font-bold text-black">
                {t('howToPlay.howToPlay')}
              </h3>
              <ul className="text-xs sm:text-sm text-gray-700 space-y-1 list-disc list-inside">
                <li>{t('howToPlay.step1')}</li>
                <li>{t('howToPlay.step2')}</li>
                <li>{t('howToPlay.step3')}</li>
                <li>{t('howToPlay.step4')}</li>
              </ul>
            </div>

            <div className="space-y-1">
              <h3 className="text-base sm:text-lg font-bold text-black">
                {t('howToPlay.tamilKeyboard')}
              </h3>
              <p className="text-xs sm:text-sm text-gray-700">
                {t('howToPlay.tamilKeyboardDescription')}
              </p>
            </div>

            <div className="bg-yellow-100 border-2 border-black shadow-[2px_2px_0px_#000] p-2 sm:p-3">
              <div className="flex items-start gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-black mt-0.5 flex-shrink-0 sm:w-5 sm:h-5"
                >
                  <path d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
                </svg>
                <p className="text-xs sm:text-sm text-black font-semibold">
                  {t('howToPlay.note')}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-center mt-4">
          <Button
            onClick={onClose}
            className="rounded-none bg-blue-400 text-black border-2 border-black shadow-[3px_3px_0px_#000] hover:shadow-[0px_0px_0px_#000] hover:bg-blue-600 font-semibold px-6 sm:px-8 text-sm sm:text-base"
          >
            {t('howToPlay.gotIt')}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
