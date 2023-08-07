'use client'

import Modal from "./Modal"
import { Auth } from "@supabase/auth-ui-react"
import { useSessionContext, useSupabaseClient } from "@supabase/auth-helpers-react"
import { ThemeSupa } from "@supabase/auth-ui-shared"
import { useRouter } from "next/navigation"
import useAccountModal from "@/hooks/useAccountModal"
import { useEffect } from "react"
import websitedata from "@/app/websitedata"


// account modal
const AccountModal = () => {
    // get supabase client
    const supabaseClient = useSupabaseClient()
    // get session from context
    const { session } = useSessionContext()
    // router
    const router = useRouter()
    // use account modal
    const accountModal = useAccountModal()

    // use effect to handle the login/register on close modal
    useEffect(() => {
        // if exists session
        if(session && accountModal.isOpen) {
            // refresh page
            router.refresh()
            // close modal
            accountModal.onClose()
        }
    }, [session, router, accountModal])

    // on change modal handler
    const onChangeHandler = (isOpen: boolean) => {
        // if modal is opened
        // close it
        if(isOpen) accountModal.onClose()
    }

    // render elements
    return (
        <Modal
            title="Login or Register"
            description={`Welcome to ${websitedata.title}.`}
            isOpen={accountModal.isOpen}
            onChange={() => onChangeHandler(accountModal.isOpen)}>
            <div className="h-fit w-full md:w-[80%]">
                <Auth supabaseClient={supabaseClient}
                    theme="light"
                    providers={['google', 'facebook', 'apple']}
                    magicLink
                    localization={{
                        variables: {
                            sign_in: {
                                button_label: 'Log-in',
                                email_label: 'E-mail',
                                password_label: 'Password',
                                email_input_placeholder: 'Your e-mail address',
                                password_input_placeholder: 'Your password',
                                loading_button_label: 'Signing in...',
                                link_text: 'Sign in',
                                social_provider_text: 'Continue with {{provider}}'
                            },
                            sign_up: {
                                button_label: 'Register',
                                email_label: 'E-mail',
                                password_label: 'Password',
                                email_input_placeholder: 'Your e-mail address',
                                password_input_placeholder: 'Your password',
                                loading_button_label: 'Signing up...',
                                confirmation_text: 'A confirmation link will be sent to your e-mail address',
                                link_text: 'Do not have an account? Sign up!',
                                social_provider_text: 'Continue with {{provider}}'
                            },
                            magic_link: {
                                button_label: 'Send magic link',
                                email_input_label: 'E-mail',
                                email_input_placeholder: 'Your e-mail address',
                                confirmation_text: 'A magic link will be sent to your e-mail address',
                                link_text: 'Send magic link',
                                loading_button_label: 'Sending...'
                            },
                            forgotten_password: {
                                button_label: 'Update',
                                email_label: 'E-mail',
                                email_input_placeholder: 'Your e-mail address',
                                confirmation_text: 'A confirmation link will be sent to your e-mail address',
                                link_text: 'Forgot your password?',
                                loading_button_label: 'Sending link...',
                                password_label: 'New password'
                            },
                            update_password: {
                                button_label: 'Update',
                                password_label: 'Password',
                                password_input_placeholder: 'New password',
                                confirmation_text: 'Your password has been updated!',
                                loading_button_label: 'Updating password...'
                            },
                            verify_otp: {
                                button_label: 'Code verification',
                                email_input_label: 'E-mail',
                                email_input_placeholder: 'Your e-mail address',
                                phone_input_label: 'Phone',
                                phone_input_placeholder: 'Your phone number',
                                token_input_label: 'Code',
                                token_input_placeholder: 'Type the received code',
                                loading_button_label: 'Signing in...'
                            }
                        }
                    }}
                    otpType="email"
                    appearance={{
                        theme: ThemeSupa,
                        variables: {
                            default: {
                                colors: {
                                    brand: '#dd4f15',
                                    brandAccent: '#9f2809'
                                },
                                borderWidths: {
                                    buttonBorderWidth: '1px',
                                    inputBorderWidth: '1px'
                                },
                                radii: {
                                    borderRadiusButton: '8px',
                                    buttonBorderRadius: '8px',
                                    inputBorderRadius: '8px'
                                }
                            }
                        }
                    }}
                />
            </div>
        </Modal>
    );
}
 
export default AccountModal;
