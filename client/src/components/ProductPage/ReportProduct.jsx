import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'

import { AlertCircle, Loader2 } from 'lucide-react'
import { useState } from 'react'
import { Button } from '../ui/button'
import { Textarea } from '../ui/textarea'

import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { reportApiService } from '@/services/apiService'
import useApiCall from '@/hooks/useApiCall'

const ReportUserCard = ({ productId }) => {
  const [selectedReason, setSelectedReason] = useState('')
  const [description, setDescription] = useState('')
  const [submitMessage, setSubmitMessage] = useState('')

  const [newProductReportApiCall, loading] = useApiCall(
    reportApiService.createProductReport
  )

  const reportReasons = [
    'Inappropriate Content',
    'Spam',
    'Hate Speech',
    'Scam or Fraud',
    'Other',
  ]

  const handleSubmit = async () => {
    if (!selectedReason) {
      setSubmitMessage('Please select a reason for reporting.')
      return
    }

    if (!description) {
      setSubmitMessage('Please provide a description.')
      return
    }

    const report = {
      reportedProduct: productId,
      reportType: 'product',
      reason: selectedReason,
      description,
    }
    try {
      const response = await newProductReportApiCall(
        'Report Submitted successfully!',
        report
      )
      console.log(response)
    } catch (error) {
      console.error('Report Submission Failed', error)
    } finally {
      setSelectedReason('')
      setDescription('')
      setSubmitMessage('')
    }

    const escKeyEvent = new KeyboardEvent('keydown', {
      key: 'Escape',
      keyCode: 27,
    })
    document.dispatchEvent(escKeyEvent)
  }

  const handleReasonChange = (value) => {
    setSelectedReason(value)
    setSubmitMessage('')
  }

  return (
    <div className="p-1">
      <h2 className="text-lg flex items-center font-bold mb-2">
        Report Product
        <AlertCircle size={18} className="text-red-500 ml-2" />
      </h2>
      <div className="flex items-center">
        <div className="flex-1">
          <label
            htmlFor="reportReason"
            className="block mb-2 font-semibold text-sm"
          >
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
          <Label htmlFor="reportDescription">
            <span className="block mt-4 font-semibold text-sm">
              Report Description
            </span>
            <Textarea
              className="mt-2 p-2 w-full rounded"
              placeholder="Give a brief description about the report"
              id="reportDescription"
              value={description}
              onChange={(e) =>
                setDescription(e.target.value) || setSubmitMessage('')
              }
              rows="4"
            ></Textarea>
          </Label>
        </div>
      </div>
      {submitMessage && (
        <p className="mt-2 font-semibold text-xs text-red-500">
          {submitMessage}
        </p>
      )}
      <div className="flex items-center mt-4">
        <Button className="rounded py-2 mr-4" onClick={handleSubmit}>
          {loading ? (
            <>
              {' '}
              <Loader2 className="animate-spin mr-2" /> <span>Please wait</span>
            </>
          ) : (
            <div className="flex">Submit Report</div>
          )}
        </Button>
        <Button
          variant="outline"
          onClick={() => {
            setSelectedReason('')
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

export function ReportProduct({ productId }) {
  return (
    <Popover className="popup-item">
      <PopoverTrigger asChild>
        <div className="flex cursor-pointer">
          <span className="font-semibold underline text-red-500">
            Report this product
          </span>
        </div>
      </PopoverTrigger>
      <PopoverContent className="w-80 popup-item">
        <ReportUserCard productId={productId} />
      </PopoverContent>
    </Popover>
  )
}
