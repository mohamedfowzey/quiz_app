import { Trash2Icon, Loader2Icon, LogOut } from "lucide-react"

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogMedia,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"

export function AlertDialogDestructive({
  title,
  tDescription,
  onDelete,
  open,
  onOpenChange,
  loading = false,
}: {
  title: string
  tDescription: string
  onDelete: () => void
  open: boolean
  onOpenChange: () => void
  loading?: boolean
}) {
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent size="sm">
        <AlertDialogHeader>
          <AlertDialogMedia className="bg-destructive/10 text-destructive dark:bg-destructive/20 dark:text-destructive">
           {title === 'logout' ? <LogOut/>:
            <Trash2Icon />
           }
          </AlertDialogMedia>
          <AlertDialogTitle>{title!=='logout' && 'Delete'} {title}</AlertDialogTitle>
          <AlertDialogDescription>{tDescription}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel variant="outline" disabled={loading} onClick={onOpenChange}>
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            variant="destructive"
            disabled={loading}
            onClick={(e) => {
              e.preventDefault()
              onDelete()
            }}
          >
            {loading ? (
              <>
                <Loader2Icon className="animate-spin" />
                {title === 'logout' ? 'logingout...' : 'Deleting...'}
              </>
            ) : (
              

              title !== 'logout'?  "Delete" : 'logout'
              
            )}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}