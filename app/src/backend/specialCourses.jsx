

//parameter needed is the StudentData
//this function consist 3 functions (Check_HK, Check_NSTP, Check_Thesis)
//each function will check if the student already take and passed certain subjects. If so then it would return true otherwise false
//the return values of the 3 function inside will be stored in array named result
//this function returns array consist 3 boolean elements
const SpecialCourses= (sampleData) => {
    
    //return values of the 3 functions will be stored in this array
    let result = [];

    //this function will check if certain HK subjects are already taken
    const Check_HK= (sampleData) => {
        
        // an array constisting list of HK needed to be passed
        //format is ["name of hk","name in old curriculum", "number of times needed to enroll"....]
        const required_HK = ["HK 11", "PE 1",1,"HK 12", "PE 2",3];
        let num_of_required_hk = 4;
        let counter = 0;

        //this loop will check if list of HK are already been taken by checking in the list of courses in the studentData
        //after checking if HK already been taken check if they passed by checking studentData grade
        //if criteria has been met increment the counter 
        for (let i = 0; i < required_HK.length; i+=3) {
            for (let j = 0; j < sampleData.courses.length; j++) {
                if((required_HK[i].localeCompare(sampleData.courses[j]) == 0) || (required_HK[i+1].localeCompare(sampleData.courses[j]) == 0)){
                    if(sampleData.grades[j] <= 3){
                        // console.log(sampleData.courses[j])
                        // console.log(sampleData.grades[j])
                        counter++;
                    }

                }
           }
        }

        //check if number of required hk has been met if so then return true otherwise false
        if(num_of_required_hk == counter){
            return true;
        }else{
            return false;
        }
   }

   //this function will check if certain NSTP subjects are already taken
   const Check_NSTP= (sampleData) => {
       // an array constisting list of NSTP needed to be passed
        const required_NSTP = ["NSTP 1", "NSTP 2"];
        let num_of_required_NSTP = 2;
        let counter = 0;


        //this loop will check if list of NSTPs are already been taken by checking in the list of courses in the studentData
        //after checking if NSTPs already been taken check if they passed by checking studentData grade
        //if criteria has been met increment the counter 
        for (let i = 0; i < required_NSTP.length; i++) {
            for (let j = 0; j < sampleData.courses.length; j++) {
                if(required_NSTP[i].localeCompare(sampleData.courses[j]) == 0){
                    if(sampleData.grades[j] <= 3 ){
                        // console.log(sampleData.courses[j])
                        // console.log(sampleData.grades[j])
                        counter++;
                    }

                }
            }
        }

        //check if number of required NSTP has been met if so then return true otherwise false
        if(num_of_required_NSTP == counter){
            return true;
        }else{
            return false;
        }
    }

   //this function will check if certain NSTP subjects are already taken    
    const Check_THESIS= (sampleData) => {
        const required_THESIS = ["COMA 200"];
        let num_of_required_THESIS = 1;
        let counter = 0;


        //this loop will check if list of THESIS are already been taken by checking in the list of courses in the studentData
        //after checking if THESIS already been taken check if they passed by checking studentData grade
        //if criteria has been met increment the counter 
        for (let i = 0; i < required_THESIS.length; i++) {
            for (let j = 0; j < sampleData.courses.length; j++) {
                if(required_THESIS[i].localeCompare(sampleData.courses[j]) == 0){
                    if(sampleData.grades[j] <= 3 ){
                        // console.log(sampleData.courses[j])
                        // console.log(sampleData.grades[j])
                        counter++;
                    }

                }
           }
        }

        //check if number of required thesis has been met if so then return true otherwise false        
        if(num_of_required_THESIS == counter){
            return true;
        }else{
            return false;
        }
   }   

   //function call and appending its return value to result array
    result.push(Check_HK(sampleData));
    result.push(Check_NSTP(sampleData));
    result.push(Check_THESIS(sampleData));

    //console.log(result);
    //return value
    return result;
}

export default SpecialCourses;