import { Gender, NewPatientEntry } from "./type";

const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String;
};

const parseName = (name: unknown): string => {
  if (!isString(name) || name.length < 3) {
    throw new Error('Incorrect or missing name!');
  }
  return name;
};

const isDate = (date: string) => {
   return !Boolean(Date.parse(date));
}

const parseDate = (date: unknown): string => {
  if(!isString(date) || !isDate(date)) {
    throw new Error('Incorrect date: ' + date);
  }
  return date;
}

const parseSsn = (ssn: unknown): string => {
  if(!isString(ssn) || ssn.length !== 11) {
    throw new Error('Incorrect or missing ssn:' + ssn);
  };
  return ssn;
};

const isGender = (param: string): param is Gender => {
  return Object.values(Gender).map(g => g.toString()).includes(param) 
}
const parseGender = (gender: unknown): Gender => {
  if (!isString(gender) || !isGender(gender)) {
    throw new Error('Incorrect or missing gender:' + gender);
  };
  return gender;
};

const parseOccupation = (occupation: unknown): string => {
  if (!isString(occupation)) {
    throw new Error('Incorrect or missing occupation:' + occupation);
  };
  return occupation;
};

const toNewPatientEntry = (object: unknown): NewPatientEntry => {
  if ( !object || typeof object !== 'object' ) {
    throw new Error('Incorrect or missing data');
  }

  if( 'name' in object && 'dateOfBirth' in object && 'ssn' in object && 'gender' in object && 'occupation' in object ) {
    const newPatient : NewPatientEntry = {
      name : parseName(object.name),
      dateOfBirth: parseDate(object.dateOfBirth),
      ssn: parseSsn(object.ssn),
      gender: parseGender(object.gender),
      occupation: parseOccupation(object.occupation)
    };
    return newPatient;
  }
  throw new Error('Incorrect data: a field missing');
}

export default toNewPatientEntry;