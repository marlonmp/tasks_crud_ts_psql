export interface iTask extends map<string|undefined>{
    id?: string
    name?: string
    description?: string
    date?: string
}

type map<T> = {
    [key: string]: T
}

type err = {
    ok: boolean
    errors: iTask
}

const validations: map<(value: string)=> string > = {
    id: (value: string) => /^\d{1,5}$/.test(value) ? '' : 'This id is not valid',

    name: (value: string) => /^[\w\d\s]{1,60}$/.test(value) ? '' : 'This name is not valid',

    description: (value: string) => /^[\w\d\s]{1,60}$/.test(value) ? '' : 'This description is not valid',

    date: (value: string) => {
        const date = new Date(value)

        if (date.toString() != 'Invalid Date') {
            
            const date_time = date.getTime()
    
            const minimun_date = new Date('2020-01-01').getTime()
    
            const maximun_date = new Date().getTime()

            if (date_time > minimun_date || date_time < maximun_date) return ''
            // return `${date.getFullYear()}-${date.getMonth()}-${date.getDay()}`
        }
        return 'This date is not valid'
    }
}

export function validate_values(values: map<string>, task?: iTask) {
    const err: err = {
        ok: true,
        errors: {}
    }

    for(const key in validations) {
        if (!values[key]) continue

        const res = validations[key](values[key])

        if (res) {
            err.ok = false
            err.errors[key] = res
        }
        
        else if (task) task[key] = values[key]
    }

    return err
}

export function format_date(value: string, task?: iTask) {
    const date = new Date(value)

    const formatted_date = `${date.getFullYear()}-${date.getMonth()}-${date.getDay()}`

    if (task) task.date = formatted_date
    
    else return formatted_date
}