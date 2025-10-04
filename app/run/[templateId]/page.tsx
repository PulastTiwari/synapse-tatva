import { AppShell } from "@/components/shell/app-shell"
import { TemplateRunContent } from "@/components/templates/template-run-content"

export default function TemplateRunPage({ params }: { params: { templateId: string } }) {
  return (
    <AppShell>
      <TemplateRunContent templateId={params.templateId} />
    </AppShell>
  )
}
