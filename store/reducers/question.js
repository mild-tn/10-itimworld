import actionCreator from '../../utils/actionCreator'

// Actions
const questionAction = actionCreator('answer')
const SET_QUESTION = questionAction('SET_QUESTION')
const SET_ANSWER = questionAction('SET_ANSWER')
const SET_CURRENT_QUESTION = questionAction('SET_CURRENT_QUESTION')
const SET_CURRENT_ANSWER_ID = questionAction('SET_CURRENT_ANSWER_ID')
const HIDE_DIALOG = questionAction('HIDE_DIALOG')
const POSTED_ANSWER = questionAction('POSTED_ANSWER')
const SET_ANSWERED_QUESTION = questionAction('SET_ANSWERED_QUESTION')
const POSTING_ANSWER = questionAction('POSTING_ANSWER')

const initialState = {
  questions: [],
  answers: {
    questionid: '',
    data: '',
    length: 0
  },
  currentQuestion: '',
  currentAnswerId: '',
  error: false,
  show: false,
  message: '',
  answered: [],
  isPending: false
}

// Reducer
export default (state = initialState, action) => {
  switch (action.type) {
    case SET_QUESTION: {
      return {
        ...state,
        questions: action.questions
      }
    }

    case SET_ANSWER: {
      return {
        ...state,
        answers: {
          questionid: action.qid,
          data: action.answer,
          length: action.length
        }
      }
    }

    case SET_CURRENT_ANSWER_ID: {
      return {
        ...state,
        currentAnswerId: {
          id: action.answerId
        }
      }
    }

    case SET_CURRENT_QUESTION: {
      return {
        ...state,
        currentQuestion: action.questionData
      }
    }

    case HIDE_DIALOG: {
      return {
        ...state,
        show: false
      }
    }
    case POSTING_ANSWER: {
      return {
        ...state,
        isPending: action.data
      }
    }
    case POSTED_ANSWER: {
      return {
        ...state,
        show: true,
        error: action.data.error,
        message: action.data.message
      }
    }

    case SET_ANSWERED_QUESTION: {
      return {
        ...state,
        answered: action.answered
      }
    }

    default:
      return state
  }
}

// Action Creators
export const actions = {
  setQuestion: (questions) => ({
    type: SET_QUESTION,
    questions
  }),
  setAnswer: (qid, answer, length) => ({
    type: SET_ANSWER,
    qid,
    answer,
    length
  }),
  setCurrentQuestion: (questionData) => ({
    type: SET_CURRENT_QUESTION,
    questionData
  }),
  setCurrentAnswerId: (answerId) => ({
    type: SET_CURRENT_ANSWER_ID,
    answerId
  }),
  postedAnswer: (data) => ({
    type: POSTED_ANSWER,
    data
  }),
  hideDialog: () => ({
    type: HIDE_DIALOG
  }),
  setAnsweredQuestion: (answered) => ({
    type: SET_ANSWERED_QUESTION,
    answered
  }),
  postingAnswer: (data) => ({
    type: POSTING_ANSWER,
    data
  })
}
