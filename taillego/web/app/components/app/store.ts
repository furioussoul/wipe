import { create } from 'zustand'
import type { App, AppSSO } from '@/types/app'
// import type { IChatItem }  '@/app/components/base/chat/chat/type'
declare type IChatItem = any

type State = {
  appDetail?: App & Partial<AppSSO>
  appSidebarExpand: string
  currentLogItem?: IChatItem
  currentLogModalActiveTab: string
  showPromptLogModal: boolean
  showAgentLogModal: boolean
  showMessageLogModal: boolean
}

type Action = {
  setAppDetail: (appDetail?: App & Partial<AppSSO>) => void
  setAppSiderbarExpand: (state: string) => void
  setCurrentLogItem: (item?: IChatItem) => void
  setCurrentLogModalActiveTab: (tab: string) => void
  setShowPromptLogModal: (showPromptLogModal: boolean) => void
  setShowAgentLogModal: (showAgentLogModal: boolean) => void
  setShowMessageLogModal: (showMessageLogModal: boolean) => void
}

export const useStore = create<State & Action>(set => ({
  appDetail: {
    "id": "942ffac7-efec-4630-b46d-3d8438e2ee2a",
    "name": "hjhj",
    "description": "",
    "mode": "advanced-chat",
    "icon_type": null,
    "icon": "\ud83e\udd16",
    "icon_background": "#FFEAD5",
    "icon_url": null,
    "enable_site": true,
    "enable_api": true,
    "model_config": null,
    "workflow": null,
    "site": {
      "access_token": "2fpywpOHtGBy9rcM",
      "code": "2fpywpOHtGBy9rcM",
      "title": "hjhj",
      "icon_type": null,
      "icon": "\ud83e\udd16",
      "icon_background": "#FFEAD5",
      "icon_url": null,
      "description": null,
      "default_language": "en-US",
      "chat_color_theme": null,
      "chat_color_theme_inverted": false,
      "customize_domain": null,
      "copyright": null,
      "privacy_policy": null,
      "custom_disclaimer": null,
      "customize_token_strategy": "not_allow",
      "prompt_public": false,
      "app_base_url": "http://127.0.0.1:3000",
      "show_workflow_steps": true,
      "use_icon_as_answer_icon": false,
      "created_by": null,
      "created_at": 1723740068,
      "updated_by": null,
      "updated_at": 1723740068
    },
    "api_base_url": "http://127.0.0.1:5001/v1",
    "use_icon_as_answer_icon": false,
    "created_by": null,
    "created_at": 1723740068,
    "updated_by": null,
    "updated_at": 1723740068,
    "deleted_tools": []
  },
  setAppDetail: appDetail => set(() => ({ appDetail })),
  appSidebarExpand: '',
  setAppSiderbarExpand: appSidebarExpand => set(() => ({ appSidebarExpand })),
  currentLogItem: undefined,
  currentLogModalActiveTab: 'DETAIL',
  setCurrentLogItem: currentLogItem => set(() => ({ currentLogItem })),
  setCurrentLogModalActiveTab: currentLogModalActiveTab => set(() => ({ currentLogModalActiveTab })),
  showPromptLogModal: false,
  setShowPromptLogModal: showPromptLogModal => set(() => ({ showPromptLogModal })),
  showAgentLogModal: false,
  setShowAgentLogModal: showAgentLogModal => set(() => ({ showAgentLogModal })),
  showMessageLogModal: false,
  setShowMessageLogModal: showMessageLogModal => set(() => {
    if (showMessageLogModal) {
      return { showMessageLogModal }
    }
    else {
      return {
        showMessageLogModal,
        currentLogModalActiveTab: 'DETAIL',
      }
    }
  }),
}))
