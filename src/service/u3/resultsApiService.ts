import httpAxios from "@/service/httpAxios";

interface SubmissionObj {
  id: string;
  examination: string;
  studentId: string;
  firstName: string;
  lastName: string;
  teacherId: string;
  createdAt: string;
  moduleCode: string;
  grade: string;
  verified: boolean;
}

/*
Because of the big complications in extending Error in Javascript we fake the process
and use this custom error object instead...
 */
function throwApiError(msg: string) {
  throw {
    name: "ApiError",
    message: msg
  };
}

export default {
  /*  async getResults() {
    try {
      const res = await httpAxios.get("/results");
      console.log("GET request to: " + res.config.baseURL + res.config.url);
      return res;
    } catch (error) {
      console.error(error);
    }
  },*/
  async getSubmissionsByAssignment(examinationCode: string) {
    console.log(
      "Called resultsApiService->getAssignments() with examinationcode: " +
        examinationCode
    );
    try {
      const res = await httpAxios.get("/examination/" + examinationCode);
      console.log("GET request to: " + res.config.baseURL + res.config.url);
      if (res.status === 200) {
        return this.submissionObjectMapper(res.data.submissions);
      } else {
        throwApiError("Response code not 200 OK.");
      }
    } catch (error) {
      if (error.name === "ApiError") {
        throw Error(error.message);
      } else {
        throw Error("Network problem: " + error.message);
      }
    }
  },

  async submitGradeVerification(submissionId: string) {
    const apiCall = "/submission/" + submissionId + "/verify";
    console.log("trying POST request to: " + apiCall);
    try {
      const res = await httpAxios.post(apiCall, {
        submission_id: submissionId  //eslint-disable-line
      });
      console.log("POST request to: " + res.config.baseURL + res.config.url);
      if (res.status === 200) {
        return true;
      } else {
        throwApiError("Response code not 200 OK.");
      }
    } catch (error) {
      if (error.name === "ApiError") {
        throw Error(error.message);
      } else {
        throw Error("Network problem: " + error.message);
      }
    }
  },

  // Maps the API provided object to the application domain object.
  submissionObjectMapper(submArr: string | any[]) {
    const arr = [];
    for (let i = 0; i < submArr.length; i++) {
      const submObj: SubmissionObj = {
        id: submArr[i].submission_id,
        examination: submArr[i].examination,
        studentId: submArr[i].student_id,
        firstName: submArr[i].first_name,
        lastName: submArr[i].last_name,
        teacherId: submArr[i].teacher_id,
        createdAt: submArr[i].created_at,
        moduleCode: submArr[i].module_code,
        grade: submArr[i].grade,
        verified: submArr[i].verified
      };
      arr.push(submObj);
    }
    return arr;
  }
};

/*
<!--
  {"submissions":
    [
      {
        "submission_id":"assignmt03",
        "examination":null,
        "student_id":"agåb-6",
        "first_name":"Agnes",
        "last_name":"Åberg",
        "teacher_id":null,
        "created_at":null,
        "module_code":"module03",
        "grade":"G",
        "verified":false
      }
    ]
  }
  -->*/
