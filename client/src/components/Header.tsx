import { Avatar, AvatarFallback, AvatarImage } from '@radix-ui/react-avatar'
import { Link } from '@tanstack/react-router'

export default function Header() {
  return (
    <header className="p-2 flex gap-2 bg-white text-black justify-between h-14 shadow-sm overflow-hidden items-center border-b">
      <div>
        <p className="text-xl font-semibold">HANGMAN</p>
      </div>
      <Avatar className="w-9 h-9 rounded-full overflow-hidden">
        <AvatarImage src="https://github.com/shadcn.png" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
    </header>
  )
}
