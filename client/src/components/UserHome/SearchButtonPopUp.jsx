import { SearchInput } from '../ui/SearchInput'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { ButtonAsInput } from '../ui/ButtonAsInput'

export function SearchBtnPopUp() {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <ButtonAsInput />
      </PopoverTrigger>
      <PopoverContent className="w-96">
        <SearchInput />
      </PopoverContent>
    </Popover>
  )
}
