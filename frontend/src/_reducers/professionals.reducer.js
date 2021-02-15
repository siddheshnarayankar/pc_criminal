import {
  professionalConstants
} from '../_constants';

export function professionals(state = {
  city: [],
  state: [],
  basicInfo:[],
  isUpdated:false
}, action) {
  switch (action.type) {
    case professionalConstants.GET_MASTER_REQUEST:
      return {
        ...state,
        loading: true
      };
    case professionalConstants.GET_MASTER_SUCCESS:
      return {
        ...state,
        ...action.professionals,
      };
    case professionalConstants.GET_MASTER_FAILURE:
      return {
        ...state,
        error: action.error
      };
    case professionalConstants.GET_CITY_REQUEST:
      return {
        ...state,
        loading: true
      };
    case professionalConstants.GET_CITY_SUCCESS:
      return {
        ...state,
        ...action.cities
      };
    case professionalConstants.GET_CITY_FAILURE:
      return {
        ...state,
        error: action.error
      };
    case professionalConstants.GET_DISTRICT_BASICINFO_REQUEST:
      return {
        ...state,
        loading: true
      };
    case professionalConstants.GET_DISTRICT_BASICINFO_SUCCESS:
      return {
        ...state,
        basicDistricts:[...action.districts.pc_districts]
      };
    case professionalConstants.GET_DISTRICT_BASICINFO_FAILURE:
      return {
        ...state,
        error: action.error
      };
      case professionalConstants.GET_DISTRICT_GUNHA_REQUEST:
        return {
          ...state,
          loading: true
        };
      case professionalConstants.GET_DISTRICT_GUNHA_SUCCESS:
        return {
          ...state,
          gunhaDistricts:[...action.districts.pc_districts]
        };
      case professionalConstants.GET_DISTRICT_GUNHA_FAILURE:
        return {
          ...state,
          error: action.error
        };
    case professionalConstants.GET_DHARM_REQUEST:
      return {
        loading: true
      };
    case professionalConstants.GET_DHARM_SUCCESS:
      return {
        ...state,
        ...action.dharm
      };
    case professionalConstants.GET_DHARM_FAILURE:
      return {
        ...state,
        error: action.error
      };


      case professionalConstants.GET_KALAM_REQUEST:
        return {
          ...state,
          loading: true
        };
      case professionalConstants.GET_KALAM_SUCCESS:
        return {
          ...state,
          ...action.kalam
        };
      case professionalConstants.GET_KALAM_FAILURE:
        return {
          ...state,
          error: action.error
        };


        case professionalConstants.GET_KAYDA_REQUEST:
          return {
            loading: true
          };
        case professionalConstants.GET_KAYDA_SUCCESS:
          return {
            ...state,
            ...action.kayda
          };
        case professionalConstants.GET_KAYDA_FAILURE:
          return {
            ...state,
            error: action.error
          };


        case professionalConstants.GET_CRIMETYPE_REQUEST:
          return {
            ...state,
            loading: true
          };
        case professionalConstants.GET_CRIMETYPE_SUCCESS:
          return {
            ...state,
            ...action.crimeTypes
          };
        case professionalConstants.GET_CRIMETYPE_FAILURE:
          return {
            ...state,
            error: action.error
         };


         case professionalConstants.GET_CRIMETITLE_REQUEST:
          return {
            loading: true
          };
        case professionalConstants.GET_CRIMETITLE_SUCCESS:
          return {
            ...state,
            ...action.crimeTitle
          };
        case professionalConstants.GET_CRIMETITLE_FAILURE:
          return {
            error: action.error
         };

          
         case professionalConstants.GET_STATUS_REQUEST:
          return {
            loading: true
          };
        case professionalConstants.GET_STATUS_SUCCESS:
          return {
            ...state,
            ...action.status
          };
        case professionalConstants.GET_STATUS_FAILURE:
          return {
            ...state,
            error: action.error
         };

         case professionalConstants.GET_CREATE_CRIMINAL_REQUEST:
          return {
            ...state,
            loading: true
          };
        case professionalConstants.GET_CREATE_CRIMINAL_SUCCESS:
          console.log(state)
          return {
            ...state,
            basicInfo:[...state.basicInfo,...action.criminals.basicInfo],
            gunhaInfor:[...state.gunhaInfor,...action.criminals.gunhaInfor],
            otherInfo:[...state.otherInfo,...action.criminals.otherInfo]
          };
        case professionalConstants.GET_CREATE_CRIMINAL_FAILURE:
          return {
            ...state,
            error: action.error
         };
         
         case professionalConstants.GET_CRIMINALS_BY_ID_REQUEST:
          return {
            ...state,
            loading: true
          };
        case professionalConstants.GET_CRIMINALS_BY_ID_SUCCESS:
          return {
            ...state,
            otherInfo:action.criminalsList.otherInfo,
            gunhaInfor:action.criminalsList.gunhaInfor,
            basicInfo:action.criminalsList.basicInfo
          };
        case professionalConstants.GET_CRIMINALS_BY_ID_FAILURE:
          return {
            ...state,
            error: action.error
         };


         case professionalConstants.UPDATE_CRIMINALS_BY_ID_REQUEST:
          return {
            ...state,
            loading: true
          };
        case professionalConstants.UPDATE_CRIMINALS_BY_ID_SUCCESS:
          // console.log(state)
          return {
            ...state,
            // otherInfo:action.criminalsUpdatedList.otherInfo,
            // gunhaInfor:action.criminalsUpdatedList.gunhaInfor,
            // basicInfo:action.criminalsUpdatedList.basicInfo
            isUpdated:true
          };
        case professionalConstants.UPDATE_CRIMINALS_BY_ID_FAILURE:
          return {
            ...state,
            error: action.error
         };

    default:
      return state
  }
}