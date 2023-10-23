import { Input } from './SearchInput'

export function Search() {
  return (
    <div>
      <Input
        type="search"
        placeholder="Search products..."
        className="md:w-[200px] lg:w-[300px]"
        onClickIcon={() => console.log('Clicked')}
      />
    </div>
  )
}
