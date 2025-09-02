import { Avatar, AvatarFallback, AvatarImage } from '@radix-ui/react-avatar'
import { useTranslation } from 'react-i18next'
import { Dialog, DialogContent, DialogTrigger } from './ui/dialog'

export default function Header() {
  const { i18n, t } = useTranslation()
  const toggleLang = () => {
    const next = i18n.language.startsWith('ta') ? 'en' : 'ta'
    i18n.changeLanguage(next)
    document.documentElement.lang = next
  }
  return (
    <header className="font-open-sans p-2 flex gap-2 bg-white text-black justify-between h-14 overflow-hidden items-center border-b-2 border-b-black shadow-md">
      <div>
        <p className="text-xl font-semibold">{t('app.title')}</p>
      </div>
      <div className="flex items-center gap-2">
        <button
          onClick={toggleLang}
          className="h-9 px-2 border-2 border-black shadow-[3px_3px_0px_#000] font-semibold"
        >
          {i18n.language.startsWith('ta') ? t('header.en') : t('header.ta')}
        </button>
        <Dialog>
          <DialogTrigger asChild>
            <Avatar className="cursor-pointer w-9 h-9 border-2 border-black shadow-[4px_4px_0px_#000] overflow-hidden">
              <AvatarImage src="https://avatars.githubusercontent.com/u/97647867?v=4" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </DialogTrigger>
          <DialogContent className="rounded-none border-4 border-black shadow-[6px_6px_0px_#000] p-5 bg-white max-w-sm">
            <div className="flex flex-col items-center gap-4">
              <div className="h-[84px] w-[84px] border-2 border-black shadow-[4px_4px_0px_#000] overflow-hidden">
                <img
                  src="https://avatars.githubusercontent.com/u/97647867?v=4"
                  alt="Developer"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="text-center space-y-1">
                <p className="text-lg font-bold tracking-wide font-open-sans">
                  {t('header.alien501')}
                </p>
                <p className="text-sm text-muted-foreground">
                  {t('header.developer')}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <a
                  target="_"
                  href="https://github.com/Alien501"
                  className="h-[34px] w-[34px] border-2 border-black shadow-[3px_3px_0px_#000] flex items-center justify-center bg-white"
                  aria-label="GitHub"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="icon icon-tabler icons-tabler-filled icon-tabler-brand-github"
                  >
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <path d="M5.315 2.1c.791 -.113 1.9 .145 3.333 .966l.272 .161l.16 .1l.397 -.083a13.3 13.3 0 0 1 4.59 -.08l.456 .08l.396 .083l.161 -.1c1.385 -.84 2.487 -1.17 3.322 -1.148l.164 .008l.147 .017l.076 .014l.05 .011l.144 .047a1 1 0 0 1 .53 .514a5.2 5.2 0 0 1 .397 2.91l-.047 .267l-.046 .196l.123 .163c.574 .795 .93 1.728 1.03 2.707l.023 .295l.007 .272c0 3.855 -1.659 5.883 -4.644 6.68l-.245 .061l-.132 .029l.014 .161l.008 .157l.004 .365l-.002 .213l-.003 3.834a1 1 0 0 1 -.883 .993l-.117 .007h-6a1 1 0 0 1 -.993 -.883l-.007 -.117v-.734c-1.818 .26 -3.03 -.424 -4.11 -1.878l-.535 -.766c-.28 -.396 -.455 -.579 -.589 -.644l-.048 -.019a1 1 0 0 1 .564 -1.918c.642 .188 1.074 .568 1.57 1.239l.538 .769c.76 1.079 1.36 1.459 2.609 1.191l.001 -.678l-.018 -.168a5.03 5.03 0 0 1 -.021 -.824l.017 -.185l.019 -.12l-.108 -.024c-2.976 -.71 -4.703 -2.573 -4.875 -6.139l-.01 -.31l-.004 -.292a5.6 5.6 0 0 1 .908 -3.051l.152 -.222l.122 -.163l-.045 -.196a5.2 5.2 0 0 1 .145 -2.642l.1 -.282l.106 -.253a1 1 0 0 1 .529 -.514l.144 -.047l.154 -.03z" />
                  </svg>
                </a>
                <a
                  target="_"
                  href="https://www.linkedin.com/in/vignesh501/"
                  className="h-[34px] w-[34px] border-2 border-black shadow-[3px_3px_0px_#000] flex items-center justify-center bg-white"
                  aria-label="LinkedIn"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="icon icon-tabler icons-tabler-filled icon-tabler-brand-linkedin"
                  >
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <path d="M17 2a5 5 0 0 1 5 5v10a5 5 0 0 1 -5 5h-10a5 5 0 0 1 -5 -5v-10a5 5 0 0 1 5 -5zm-9 8a1 1 0 0 0 -1 1v5a1 1 0 0 0 2 0v-5a1 1 0 0 0 -1 -1m6 0a3 3 0 0 0 -1.168 .236l-.125 .057a1 1 0 0 0 -1.707 .707v5a1 1 0 0 0 2 0v-3a1 1 0 0 1 2 0v3a1 1 0 0 0 2 0v-3a3 3 0 0 0 -3 -3m-6 -3a1 1 0 0 0 -.993 .883l-.007 .127a1 1 0 0 0 1.993 .117l.007 -.127a1 1 0 0 0 -1 -1" />
                  </svg>
                </a>
                <a
                  target="_"
                  href="mailto:cvignesh404@gmail.com"
                  className="h-[34px] w-[34px] border-2 border-black shadow-[3px_3px_0px_#000] flex items-center justify-center bg-white"
                  aria-label="Email"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="icon icon-tabler icons-tabler-filled icon-tabler-mail"
                  >
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <path d="M22 7.535v9.465a3 3 0 0 1 -2.824 2.995l-.176 .005h-14a3 3 0 0 1 -2.995 -2.824l-.005 -.176v-9.465l9.445 6.297l.116 .066a1 1 0 0 0 .878 0l.116 -.066l9.445 -6.297z" />
                    <path d="M19 4c1.08 0 2.027 .57 2.555 1.427l-9.555 6.37l-9.555 -6.37a2.999 2.999 0 0 1 2.354 -1.42l.201 -.007h14z" />
                  </svg>
                </a>
                <a
                  target="_"
                  href="https://t.me/Alien_501"
                  className="h-[34px] w-[34px] border-2 border-black shadow-[3px_3px_0px_#000] flex items-center justify-center bg-white"
                  aria-label="Telegram"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    className="icon icon-tabler icons-tabler-outline icon-tabler-brand-telegram"
                  >
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <path d="M15 10l-4 4l6 6l4 -16l-18 7l4 2l2 6l3 -4" />
                  </svg>
                </a>
              </div>
              <a
                href="https://github.com/Alien501/hangman"
                target="_"
                className="inline-flex items-center justify-center gap-2 px-3 py-2 border-2 border-black shadow-[4px_4px_0px_#000] font-semibold"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="icon icon-tabler icons-tabler-filled icon-tabler-brand-github"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <path d="M5.315 2.1c.791 -.113 1.9 .145 3.333 .966l.272 .161l.16 .1l.397 -.083a13.3 13.3 0 0 1 4.59 -.08l.456 .08l.396 .083l.161 -.1c1.385 -.84 2.487 -1.17 3.322 -1.148l.164 .008l.147 .017l.076 .014l.05 .011l.144 .047a1 1 0 0 1 .53 .514a5.2 5.2 0 0 1 .397 2.91l-.047 .267l-.046 .196l.123 .163c.574 .795 .93 1.728 1.03 2.707l.023 .295l.007 .272c0 3.855 -1.659 5.883 -4.644 6.68l-.245 .061l-.132 .029l.014 .161l.008 .157l.004 .365l-.002 .213l-.003 3.834a1 1 0 0 1 -.883 .993l-.117 .007h-6a1 1 0 0 1 -.993 -.883l-.007 -.117v-.734c-1.818 .26 -3.03 -.424 -4.11 -1.878l-.535 -.766c-.28 -.396 -.455 -.579 -.589 -.644l-.048 -.019a1 1 0 0 1 .564 -1.918c.642 .188 1.074 .568 1.57 1.239l.538 .769c.76 1.079 1.36 1.459 2.609 1.191l.001 -.678l-.018 -.168a5.03 5.03 0 0 1 -.021 -.824l.017 -.185l.019 -.12l-.108 -.024c-2.976 -.71 -4.703 -2.573 -4.875 -6.139l-.01 -.31l-.004 -.292a5.6 5.6 0 0 1 .908 -3.051l.152 -.222l.122 -.163l-.045 -.196a5.2 5.2 0 0 1 .145 -2.642l.1 -.282l.106 -.253a1 1 0 0 1 .529 -.514l.144 -.047l.154 -.03z" />
                </svg>
                <span>{t('header.source')}</span>
              </a>
              <span className="text-xs text-muted-foreground">
                {t('header.wordsBy')}{' '}
                <a
                  className="underline"
                  href="https://github.com/mskian/vue-tamil-words"
                  target="_"
                >
                  mskian
                </a>
              </span>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </header>
  )
}
