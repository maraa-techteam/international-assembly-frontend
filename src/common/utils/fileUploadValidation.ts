export const maxUploadFileSizeInBytes = 5 * 1024 * 1024

export function isPdfFile(file: Pick<File, 'type' | 'name'>): boolean {
  return (
    file.type === 'application/pdf' || file.name.toLowerCase().endsWith('.pdf')
  )
}

export function sanitizePdfFilename(filename: string): string {
  const safeSource = filename.trim() || 'attachment'
  const filenameWithoutPath = safeSource.split(/[/\\]/).pop() || 'attachment'
  const filenameWithoutExtension = filenameWithoutPath.replace(/\.pdf$/i, '')
  const safeBaseName = filenameWithoutExtension
    .replace(/[^\p{L}\p{N}_-]/gu, '_')
    .replace(/_+/g, '_')
    .replace(/^_+|_+$/g, '')

  return `${safeBaseName || 'attachment'}.pdf`
}
