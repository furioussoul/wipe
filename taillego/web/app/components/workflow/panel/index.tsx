import type { FC } from 'react'
import { memo } from 'react'
import { useNodes } from '@xyflow/react'
import useShallow from 'zustand/shallow'
import type { CommonNodeType } from '../types'
import { Panel as NodePanel } from '../nodes'
import { useStore } from '../store'
import {
  useIsChatMode,
} from '../hooks'
// import DebugAndPreview from './debug-and-preview'
// import WorkflowPreview from './workflow-preview'
import ChatVariablePanel from './chat-variable-panel'
import EnvPanel from './env-panel'
import cn from '@/utils/classnames'
import MessageLogModal from '@/app/components/base/message-log-modal'

const Panel: FC = () => {
  const nodes = useNodes<CommonNodeType>()
  const isChatMode = useIsChatMode()
  const selectedNode = nodes.find(node => node.data.selected)
  const historyWorkflowData = useStore(s => s.historyWorkflowData)
  const showDebugAndPreviewPanel = useStore(s => s.showDebugAndPreviewPanel)
  const showEnvPanel = useStore(s => s.showEnvPanel)
  const showChatVariablePanel = useStore(s => s.showChatVariablePanel)
  const isRestoring = useStore(s => s.isRestoring)
  const { currentLogItem, setCurrentLogItem, showMessageLogModal, setShowMessageLogModal, currentLogModalActiveTab } = useAppStore(useShallow(state => ({
    currentLogItem: state.currentLogItem,
    setCurrentLogItem: state.setCurrentLogItem,
    showMessageLogModal: state.showMessageLogModal,
    setShowMessageLogModal: state.setShowMessageLogModal,
    currentLogModalActiveTab: state.currentLogModalActiveTab,
  })))

  return (
    <div
      tabIndex={-1}
      className={cn('absolute top-14 right-0 bottom-2 flex z-10 outline-none')}
      key={`${isRestoring}`}
    >
      {
        showMessageLogModal && (
          <MessageLogModal
            fixedWidth
            width={400}
            currentLogItem={currentLogItem}
            onCancel={() => {
              setCurrentLogItem()
              setShowMessageLogModal(false)
            }}
            defaultTab={currentLogModalActiveTab}
          />
        )
      }
      {
        !!selectedNode && (
          <NodePanel {...selectedNode!} />
        )
      }
      {
        showDebugAndPreviewPanel && isChatMode && (
          <span>DebugAndPreview</span>
        )
      }
      {
        showDebugAndPreviewPanel && !isChatMode && (
          <span>WorkflowPreview</span>
        )
      }
      {
        showEnvPanel && (
          <EnvPanel />
        )
      }
      {
        showChatVariablePanel && (
          <ChatVariablePanel />
        )
      }
    </div>
  )
}

export default memo(Panel)
