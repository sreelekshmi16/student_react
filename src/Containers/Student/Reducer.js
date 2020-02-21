const list = [
    {
        id: 1, Name: "aadya"
    }, { id: 2, Name: "bhavya" }, { id: 3, Name: "charu" }, { id: 4, Name: "deepak" }, { id: 5, Name: "Emil" }, { id: 6, Name: "saadya" },
    { id: 7, Name: "tinu" }, { id: 8, Name: "vedhanth" }, { id: 9, Name: "Jithin" }, { id: 10, Name: "Rithvik" }]



const initialState = {
    list: list,
    studentList: list,
    // dummyObj :{}
    // searchString:''
}

const SEARCH_RESULT = "search"
const ADD_STUDENT = "Add"
const UPDATE_STUDENT ="update"
const DELETE_STUDENT = "delete"
// const CLEAR_SEARCH ="search"
const ASCENDING_LIST ="ascending"
const DESCENDING_LIST="descending"
const ENTRY_ADD ="entry add"



export function onSearchHandler(params) {
    console.log("params", params.searchString)
    return {
        type: SEARCH_RESULT,
        params
    }
}
// export function onClearHandler(){



// }
 
export function onAddHandler(params) {
    console.log("add params", params.addString)
    return {
        type: ADD_STUDENT,
        params
    }
}

export function updateAndSaveHandler(params){
    console.log("update params",params.updatedName,params.studentId)


    return{
        type: UPDATE_STUDENT,
        params
    }
}

export function onRemoveHandler(params){
  console.log("delete params",params.id)
    
 return{
     type:  DELETE_STUDENT,
     params

 }
}
export function ascendingListHandler(){
console.log("ascending worksssss")
return{
    type: ASCENDING_LIST
}
}
export function descendingListHandler(){
    console.log("descending worksssss")
    return{
        type: DESCENDING_LIST
    }
    }

export function entryOnSubmitHandler(params){
 console.log("entryyy works")
 console.log("params entrysybmittt",params.indexId)
 return{
     type:ENTRY_ADD,
     params
 }

}
export const Reducer = (state = initialState, action) => {

    switch (action.type) {

        case SEARCH_RESULT:

            const{searchString} = action.params
            console.log("gssssssssssss===============================================", searchString)
            const newState = { ...state }
            const searchItemList = newState.list.filter(item => {
                // if(searchString){
                console.log("itemmmssssssssss", item)
                if (item.Name.toLowerCase().includes(searchString.toLowerCase())) {
                    console.log("90000000000", item.Name.toLowerCase().includes(searchString.toLowerCase()))
                    return item
                }
                
                // }else return item
            })
            console.log("seach item list ---------",searchItemList)
           

            return {
                ...newState,
                studentList: searchItemList
            }
        case ADD_STUDENT:
            console.log("check add param", action.params.addString)
            const { addString } = action.params
            const newStates = { ...state }
            const newList = [...newStates.studentList]
            
            console.log("newList", newList)
            const index = newList.findIndex(item => item.Name === addString)
           let tempArray = []
        //    let dummyArray =[]
            if (index === -1 && addString!=='') {
                 const { addString } = action.params
                
                tempArray =[...newList]
                tempArray.push({
                    id: newList.length + 1,
                     Name: addString,
                     Isadded:true
                })   
          
            }  
                else tempArray = newList
                return {
                    ...newStates,
                    studentList: [...tempArray]
                    
                }

            case UPDATE_STUDENT:
            console.log("aaaaaaaaaaaaaaaaaaaaaaaaaa",action.params.updatedName)
            console.log("idddddddddddddddddddddd",action.params.studentId)
            const currentState = {...state}
            const { updatedName } = action.params;
            const { studentId } = action.params
           
            const currentlist =[...currentState.studentList]
            console.log("studentlist nowwwwwwwwww", currentlist)
            
          const aa = currentlist.map(item=>{
            if(item.id === studentId){
                return {
                    id: item.id,
                    Name: updatedName,
                    Isadded: item.Isadded ? item.Isadded : false
                }
            } else return item
        })
            console.log("aaaa",aa)
           
                // if(item.id===studentId){
                //     return item.Name === updatedName
                // }
            // })
          return {
              ...state,
              studentList: [...aa]
          }
        
        case DELETE_STUDENT:
        console.log("remmmoveeeeeee",action.params.id,action.params.name)
        const{id} = action.params
        const{name} = action.params
        const tempState ={...state}
        const tempList =[...tempState.studentList]
        const filteredList = tempList.filter(item=>{
            if(item.id!==id){
                return item
             }
        })
     

        console.log("ffffffffffff",filteredList)
        return {
            ...state,
            studentList: [...filteredList]
        }

        case ASCENDING_LIST:
        console.log("ascendingggggggg")
        const dummyState ={...state}
        const dummyList =[...dummyState.studentList]
        let ascendingList = dummyList.sort(function(a, b){
            var nameA=a.Name.toLowerCase(), nameB=b.Name.toLowerCase()
            if (nameA < nameB) 
                return -1 
            if (nameA > nameB)
                return 1
            return 0 
        })
        console.log(ascendingList);

            return{
                ...state,
                studentList:[...ascendingList]
            }

        case DESCENDING_LIST:
        console.log("descending listttt")
        const dummyStates ={...state}
        const dummyLists =[...dummyStates.studentList]
        let descendingList = dummyLists.sort((a, b)=>{
            var nameA=a.Name.toLowerCase(), nameB=b.Name.toLowerCase()
            if (nameA > nameB) 
                return -1 
            if (nameA < nameB)
                return 1
            return 0 
        })
        console.log(descendingList);

            return{
                ...state,
                studentList:[...descendingList]
            }
       
        case ENTRY_ADD:
        console.log("entry workedddddddd")
        const{indexId,value} = action.params
        console.log("checkk index value",indexId,value)
        const dummyStatess ={...state}
        const dummyListss =[...dummyStatess.studentList]
        const useList =[...dummyListss]
      
            if(indexId<parseInt(useList.length)-1){
                useList.splice(indexId,0,{id:parseInt(useList.length)+1,Name:value})
        console.log("#########",useList)
            }
        return{
            ...state,
            studentList:[...useList]
        }
        
    }

    return {
        ...state
    }


}

export const getstudentObject=(state)=>{
    return state.Reducer.dummyObj
}

export const getStudentstate = (state) => {
    return state.Reducer.studentList
}



// export default Reducer;