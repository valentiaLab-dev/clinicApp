import moment from "moment";

const capitalize =  (str:string) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
} 

const formatNotificationType =  (type:string) => {
    switch(type){
        case 'email':
             return capitalize(type)
        case 'sms':
             return type.toUpperCase()
        default:
            return type
    }
}

const formatDate = (date:Date|null) => {
    if(date === null){
        return "-"
    }else{
        return moment(date).format("L")
    }
}

const formatDiscount = (value:number, type:string) => {
    return type === "percentage" ? `${value}%` : 
    value.toLocaleString('en-PH', {style: 'currency',currency: 'PHP'});
}

interface FullName {
    first_name: string;
    middle_name: string;
    last_name: string;
    suffix: string;
}
const formatFullName = (record:FullName|undefined) => {
    return (typeof record === undefined) ? '' :`${record?.first_name} ${record?.middle_name} ${record?.last_name} ${record?.suffix}`
}

interface Appointment {
    appointment_date: Date;
    patient: {
        person : FullName;
    } | undefined;
    details: string;
}
const formatApptTitle = (item:Appointment) => {
    const patient = 'patient' in item ? item.patient : undefined;
    const person = typeof patient !== 'undefined' ? patient.person : undefined;
    return `[${formatDate(item.appointment_date)}]  ${formatFullName(person)} | ${item.details}`;
}


export { 
    capitalize,
    formatNotificationType,
    formatDate,
    formatDiscount,
    formatFullName,
    formatApptTitle
}