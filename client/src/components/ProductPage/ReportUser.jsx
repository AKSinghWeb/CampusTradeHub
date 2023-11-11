import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'

import { AlertCircle, Flag } from 'lucide-react'
import { useState } from 'react'
import { Button } from '../ui/button'
import { Textarea } from '../ui/textarea'

import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'

const ReportUserCard = () => {
  const [selectedReason, setSelectedReason] = useState('')
  const [otherReason, setOtherReason] = useState('')
  const [submitMessage, setSubmitMessage] = useState('')

  const reportReasons = [
    'Harassment',
    'Inappropriate Content',
    'Spam',
    'Impersonation',
    'Hate Speech',
    'Scam or Fraud',
    'Other',
  ]

  const handleSubmit = () => {
    if (!selectedReason) {
      setSubmitMessage('Please select a reason for reporting.')
      return
    }

    // If "Other" is selected, ensure a reason is provided
    if (selectedReason === 'Other' && !otherReason.trim()) {
      setSubmitMessage('Please provide a custom reason.')
      return
    }

    // Perform submission logic here
    const reportDetails =
      selectedReason === 'Other' ? otherReason : selectedReason
    setSubmitMessage(`Report Reason: ${reportDetails}`)
  }

  const handleReasonChange = (value) => {
    setSelectedReason(value)

    // Clear the otherReason when a non-"Other" option is selected
    if (value !== 'Other') {
      setOtherReason('')
    }
  }

  return (
    <div className="p-1">
      <h2 className="text-lg flex items-center font-bold mb-2">
        Report User
        <AlertCircle size={24} className="text-red-500 ml-2" />
      </h2>
      <div className="flex items-center">
        <div className="flex-1">
          <label htmlFor="reportReason" className="sr-only">
            Select a reason for reporting
          </label>
          <RadioGroup
            id="reportReason"
            className="mt-1 w-full"
            value={selectedReason}
            defaultValue=""
            onValueChange={(value) => handleReasonChange(value)}
          >
            {reportReasons.map((reason) => (
              <div key={reason} className="flex items-center space-x-2">
                <RadioGroupItem value={reason} id={`r_${reason}`} />
                <Label htmlFor={`r_${reason}`}>{reason}</Label>
              </div>
            ))}
          </RadioGroup>

          {selectedReason === 'Other' && (
            <Textarea
              className="mt-2 p-2 w-full rounded"
              placeholder="Specify the custom reason..."
              rows="4"
              value={otherReason}
              onChange={(e) => setOtherReason(e.target.value)}
            ></Textarea>
          )}
        </div>
      </div>
      {submitMessage && (
        <p className="mt-2 font-semibold text-xs text-red-500">
          {submitMessage}
        </p>
      )}
      <div className="flex items-center mt-4">
        <Button className="rounded py-2 mr-4" onClick={handleSubmit}>
          Submit Report
        </Button>
        <Button
          variant="outline"
          onClick={() => {
            setSelectedReason('')
            setOtherReason('')
            setSubmitMessage('')
            const escKeyEvent = new KeyboardEvent('keydown', {
              key: 'Escape',
              keyCode: 27,
            })
            document.dispatchEvent(escKeyEvent)
          }}
          className="flex py-2 bg-red-600 hover:bg-red-700 hover:text-white text-white rounded close-review-popup"
        >
          Cancel
        </Button>
      </div>
    </div>
  )
}

export function ReportUser() {
  return (
    <Popover className="popup-item">
      <PopoverTrigger asChild>
        <div className="cursor-pointer flex items-center">
          <Flag size={16} className="mr-2" />
          Report User
        </div>
      </PopoverTrigger>
      <PopoverContent className="w-80 popup-item">
        <ReportUserCard />
      </PopoverContent>
    </Popover>
  )
}
