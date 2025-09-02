interface KeyboardProps {
  uyirEzhuthu: Array<string>
  meiyezhuthu: Array<string>
  onUyirEzhuthuPressed: (idx: number) => void
  onMeiyezhuthuPressed: (idx: number) => void
  uyirezhuthuPressed: number | null
  meiyezhuthuPressed: number | null
  onConfirmPressed: () => void
  onRestartPressed?: () => void
}

export default function Keyboard({
  uyirEzhuthu,
  meiyezhuthu,
  onUyirEzhuthuPressed,
  onMeiyezhuthuPressed,
  uyirezhuthuPressed,
  meiyezhuthuPressed,
  onConfirmPressed,
  onRestartPressed,
}: KeyboardProps) {
  return (
    <>
      <div className="grid lg:grid-cols-6 lg:gap-4 grid-cols-10 gap-4 wrap-normal">
        {uyirEzhuthu.map((lt, idx) => (
          <div
            onClick={() => onUyirEzhuthuPressed(idx)}
            className={`box-button btn-uyir font-bold ${(uyirezhuthuPressed || uyirezhuthuPressed == 0) && uyirezhuthuPressed == idx ? 'pressed' : ''}`}
          >
            <div
              key={idx}
              className={`key button flex items-center justify-center ${(uyirezhuthuPressed || uyirezhuthuPressed == 0) && uyirezhuthuPressed == idx ? 'pressed' : ''}`}
            >
              <span>{lt}</span>
            </div>
          </div>
        ))}
        {meiyezhuthu.map((lt, idx) => (
          <div
            onClick={() => onMeiyezhuthuPressed(idx)}
            className={`box-button btn-mei font-bold ${(meiyezhuthuPressed || meiyezhuthuPressed == 0) && meiyezhuthuPressed == idx ? 'pressed' : ''}`}
          >
            <div
              key={idx}
              className={`key button flex items-center justify-center ${(meiyezhuthuPressed || meiyezhuthuPressed == 0) && meiyezhuthuPressed == idx ? 'pressed' : ''}`}
            >
              <span>{lt}</span>
            </div>
          </div>
        ))}
      </div>
      <br />
      <div className="w-full flex items-center justify-center gap-4">
        <div
          onClick={onConfirmPressed}
          className={`box-button box-button-tick ${meiyezhuthuPressed || meiyezhuthuPressed == 0 ? 'active' : ''}`}
        >
          <div className="button flex items-center justify-center">
            <span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-check-icon lucide-check"
              >
                <path d="M20 6 9 17l-5-5" />
              </svg>
            </span>
          </div>
        </div>
        {onRestartPressed && (
          <div
            onClick={onRestartPressed}
            className="box-button box-button-refresh"
          >
            <div className="button flex items-center justify-center">
              <span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-rotate-ccw"
                >
                  <path d="M3 2v6h6" />
                  <path d="M3.51 15a9 9 0 1 0 2.13-9.36L3 8" />
                </svg>
              </span>
            </div>
          </div>
        )}
      </div>
    </>
  )
}
