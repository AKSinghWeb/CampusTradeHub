import { Button } from '@/components/ui/button'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { MessageSquare } from 'lucide-react'

export function ViewContactPopover({
  name,
  mobileNumber,
  alternateMobileNumber,
  email,
}) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button className="w-full bg-blue-600 hover:bg-blue-800">
          <MessageSquare size={18} className="inline-block mr-2" />
          View Contact Info
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <div className="grid gap-4">
          <div className="space-y-2">
            <h4 className="font-medium text-center leading-none">
              Contact Information of {name}
            </h4>
          </div>
          <div className=" border rounded-sm p-4">
            <div className="flex flex-col">
              <div className="mb-1">Mobile Number: </div>
              <div id="width" defaultValue="100%" className="col-span-2 h-8">
                {mobileNumber}
              </div>
            </div>
            <div className="flex flex-col">
              <div htmlFor="width">Alternate Mobile Number:</div>
              <div id="width" defaultValue="100%" className="col-span-2 h-8">
                {alternateMobileNumber}
              </div>
            </div>
            <div className="flex flex-col">
              <div htmlFor="width">Email: </div>
              <div id="width" defaultValue="100%" className="col-span-2 h-8">
                {email}
              </div>
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}
