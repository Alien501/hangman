interface KeyboardProps {
    uyirEzhuthu: Array<string>,
    meiyezhuthu: Array<string>,
    onUyirEzhuthuPressed: (idx: number) => void,
    onMeiyezhuthuPressed: (idx: number) => void,
    uyirezhuthuPressed: number | null,
    meiyezhuthuPressed: number | null,
    onConfirmPressed: () => void
}

export default function Keyboard({
    uyirEzhuthu,
    meiyezhuthu,
    onUyirEzhuthuPressed,
    onMeiyezhuthuPressed,
    uyirezhuthuPressed,
    meiyezhuthuPressed,
    onConfirmPressed
}: KeyboardProps) {
    return(
        <>
            <div className='overflow-y-scroll grid grid-cols-6 gap-2'>
            {
                uyirEzhuthu.map((lt, idx) => (
                <div onClick={() => onUyirEzhuthuPressed(idx)} className={`box-button btn-uyir ${(uyirezhuthuPressed || uyirezhuthuPressed == 0) && uyirezhuthuPressed == idx? 'pressed': ''}`}>
                    <div key={idx} className={`key button ${(uyirezhuthuPressed || uyirezhuthuPressed == 0) && uyirezhuthuPressed == idx? 'pressed': ''}`}>
                    <span>{lt}</span>
                    </div>
                </div>
                ))
            }
            {
                meiyezhuthu.map((lt, idx) => (
                <div onClick={() => onMeiyezhuthuPressed(idx)} className={`box-button btn-mei ${(meiyezhuthuPressed || meiyezhuthuPressed == 0) && meiyezhuthuPressed == idx? 'pressed': ''}`}>
                    <div key={idx} className={`key button ${(meiyezhuthuPressed || meiyezhuthuPressed == 0) && meiyezhuthuPressed == idx? 'pressed': ''}`}>
                    <span>{lt}</span>
                    </div>
                </div>
                ))
            }
            </div>
            <br />
            <div className='w-full'>
            <div onClick={onConfirmPressed} className={`box-button mx-auto box-button-tick ${(meiyezhuthuPressed || meiyezhuthuPressed == 0) ? 'active': ''}`}>
                <div className="button flex items-center justify-center">
                <span><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-check-icon lucide-check"><path d="M20 6 9 17l-5-5"/></svg></span>
                </div>
            </div>
            </div>
        </>
    )
}