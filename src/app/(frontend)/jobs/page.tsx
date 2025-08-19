import { FormBlock } from '@/blocks/Form/Component'
import { fields } from '@/blocks/Form/fields'
import { JobFormBlock } from '@/blocks/Form/JobForm'
import BlockContainer from '@/components/BlockContainer'
import usePayload from '@/hooks/usePayload'
import { Form } from '@payloadcms/plugin-form-builder/types'

export default async function JobsPage() {
  const { payload } = await usePayload()
  const res = await payload.find({
    collection: 'jobs',
    limit: 10,
  })
  const project = res.docs[0]
  return (
    <BlockContainer title={project.position}>
      <p>{project.description}</p>
      <JobFormBlock form={project} enableIntro={false} />
    </BlockContainer>
  )
}
