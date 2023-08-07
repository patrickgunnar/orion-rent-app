import { createClient } from '@supabase/supabase-js'


// create supabase client
export const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL || '',
    process.env.SUPABASE_SERVICE_ROLE_KEY || ''
)

// create or retrieve customer
const createOrRetrieveCustomer = async({ email, uuid }) => {
    // get data or error from db
    const { data, error } = await supabase.from('customers').select(
        'stripe_customer_id'
    ).eq('id', uuid).single()

    // if error or there's no customer data
    // create one
    if(error || !data.stripe_customer_id) {
        // create customer data
        const customer = { metadata: { supabaseUUID: uuid } }

        // if there's e-mail, insert email
        if(email) customer.email = email

        // create customer on stripe and supabase
        // ------------> CREATE CUSTOMER ON STRIPE
        const { supabaseError } = await supabase.from('customer').insert([{
            id: uuid, stripe_customer_id: uuid
        }])

        // if supabase error
        if(supabaseError) throw supabaseError

        // return customer id
        return uuid
    }

    // if exists customer
    return data.stripe_customer_id
}

export {
    createOrRetrieveCustomer
}
