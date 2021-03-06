/* global FormData */
import actionCreator from '../../utils/actionCreator'
import api from '../../utils/api'
import cookie from '../../utils/cookie'

// Actions
const dashboardAction = actionCreator('dropdown')
const SET_FIELD_FILE = dashboardAction('SET_FIELD')
const HIDE_DIALOG = dashboardAction('HIDE_DIALOG')
const UPLOAD_TRANSCRIPT = dashboardAction('UPLOAD_TRANSCRIPT', true)
const UPLOAD_PARENTAL_AUTHORIZATION = dashboardAction('UPLOAD_PARENTAL_AUTHORIZATION', true)
const INIT_DASHBOARD = dashboardAction('INIT_DASHBOARD')

const initialState = {
  files: {
    transcription_record: {
      filePath: '',
      saving: false,
      dropzoneActive: false,
      isApprove: -2,
      approveReason: ''
    },
    parental_authorization: {
      filePath: '',
      saving: false,
      dropzoneActive: false,
      isApprove: -2,
      approveReason: ''
    }
  },
  error: false,
  showDialog: false,
  message: ''
}

// Reducer
export default (state = initialState, action) => {
  switch (action.type) {
    case SET_FIELD_FILE: {
      return {
        ...state,
        files: {
          ...state.files,
          [action.field]: {
            ...state.files[action.field],
            [action.attr]: action.value
          }
        }
      }
    }

    case HIDE_DIALOG: {
      return {
        ...state,
        showDialog: false
      }
    }

    case UPLOAD_TRANSCRIPT.PENDING: {
      return {
        ...state,
        files: {
          ...state.files,
          transcription_record: {
            ...state.files.transcription_record,
            saving: true,
            dropzoneActive: false
          }
        },
        showDialog: false
      }
    }

    case UPLOAD_PARENTAL_AUTHORIZATION.PENDING: {
      return {
        ...state,
        files: {
          ...state.files,
          parental_authorization: {
            ...state.files.parental_authorization,
            saving: true,
            dropzoneActive: false
          }
        },
        showDialog: false
      }
    }

    case UPLOAD_TRANSCRIPT.FULFILLED: {
      return {
        ...state,
        files: {
          ...state.files,
          transcription_record: {
            ...state.files.transcription_record,
            saving: false,
            filePath: action.payload.data.data.path,
            isApprove: null
          }
        },
        error: false,
        showDialog: true,
        message: `อัพโหลด ปพ.1 เรียบร้อย`
      }
    }

    case UPLOAD_PARENTAL_AUTHORIZATION.FULFILLED: {
      return {
        ...state,
        files: {
          ...state.files,
          parental_authorization: {
            ...state.files.parental_authorization,
            saving: false,
            filePath: action.payload.data.data.path,
            isApprove: null
          }
        },
        error: false,
        showDialog: true,
        message: `อัพโหลด เอกสารขออนุญาตผู้ปกครองเรียบร้อย`
      }
    }

    case UPLOAD_TRANSCRIPT.REJECTED: {
      return {
        ...state,
        files: {
          ...state.files,
          transcription_record: {
            ...state.files.transcription_record,
            saving: false,
            dropzoneActive: false
          }
        },
        error: true,
        showDialog: true,
        message: action.payload
      }
    }

    case UPLOAD_PARENTAL_AUTHORIZATION.REJECTED: {
      return {
        ...state,
        files: {
          ...state.files,
          parental_authorization: {
            ...state.files.parental_authorization,
            saving: false,
            dropzoneActive: false
          }
        },
        error: true,
        showDialog: true,
        message: action.payload
      }
    }

    case INIT_DASHBOARD: {
      return {
        ...state,
        files: {
          ...state.files,
          parental_authorization: {
            ...state.files.parental_authorization,
            ...action.parent
          },
          transcription_record: {
            ...state.files.transcription_record,
            ...action.transcript
          }
        }
      }
    }

    default:
      return state
  }
}

// Action Creators
export const actions = {
  setDragActive: ({field, dropActive}) => ({
    type: SET_FIELD_FILE,
    field,
    value: dropActive,
    attr: 'dropzoneActive'
  }),
  onDropFile: (field, files, userId) => {
    const action = {
      transcription_record: UPLOAD_TRANSCRIPT,
      parental_authorization: UPLOAD_PARENTAL_AUTHORIZATION
    }
    if (files.length === 1) {
      const formData = new FormData()
      if (files[0].size > 2097152) {
        return {
          type: action[field].REJECTED,
          payload: 'ขนาดไฟล์เกิน 2 MB กรุณาอัพโหลดใหม่'
        }
      }

      formData.append('file', files[0])
      formData.append('fileType', field)
      formData.append('userId', userId)

      let {token} = cookie({req: false})
      const headers = {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${token}`
      }
      return {
        type: action[field].ACTION,
        payload: api.post('/uploads', formData, headers)
      }
    } else if (files.length > 1) {
      return {
        type: action[field].REJECTED,
        payload: 'จำนวนไฟล์เกินที่กำหนด'
      }
    } else {
      return {
        type: action[field].REJECTED,
        payload: 'นามสกุลไฟล์ไม่ถูกต้อง อัพโหลดได้เฉพาะ .jpeg .png .pdf'
      }
    }
  },
  hideDialog: () => {
    return {
      type: HIDE_DIALOG
    }
  },
  initDashboard: ({parent, transcript}) => ({
    type: INIT_DASHBOARD,
    parent,
    transcript
  })
}
