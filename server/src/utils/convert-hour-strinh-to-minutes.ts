// exemplo: 18:00 -> ["18" , "00"] -> [18, 00]

export function convertHourStringToMinutes(hourString: string){

    const [hours, mintutes] = hourString.split(':').map(Number) // Vai dividir oque vem antes e depois de :, e guardar oque apenas é número numa lista.

    const minutesAmount = (hours * 60) + mintutes

    return minutesAmount;
}