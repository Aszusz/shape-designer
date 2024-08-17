import { useCallback } from 'react'

interface DownloadOptions {
  content: string | Blob // content can be a string or a Blob
  filename?: string // filename is optional, defaults to 'file.txt'
  fileType?: string // fileType is optional, defaults to 'text/plain'
}

export function useFileDownload() {
  const downloadFile = useCallback(
    ({
      content,
      filename = 'file.txt',
      fileType = 'text/plain'
    }: DownloadOptions) => {
      const blob =
        content instanceof Blob
          ? content
          : new Blob([content], { type: fileType })
      const link = document.createElement('a')
      link.href = URL.createObjectURL(blob)
      link.download = filename
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    },
    []
  )

  return downloadFile
}
