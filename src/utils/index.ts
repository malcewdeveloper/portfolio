export function convertDateToAge(date: string): string {
    const a = new Date(date);
    const currentDate = new Date(Date.now());
    
    let isBirthday = (a.getMonth() <= currentDate.getMonth()) && (a.getDate() <= currentDate.getDate()); // Наступил ли день рождения в этом году
    let age = currentDate.getFullYear() - a.getFullYear();

    !isBirthday && age--;
    
    if(age > 4 && age < 21) return `${age} лет`;
    if(Number(age.toString().split('')[age.toString().split('').length - 1]) > 5 || Number(age.toString().split('')[age.toString().split('').length - 1]) === 0) return `${age} лет`;
    if(Number(age.toString().split('')[age.toString().split('').length - 1]) === 1) return `${age} год`;
    return `${age} года`;
}


 