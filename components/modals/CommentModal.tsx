'use client'

import useCommentModal from "@/hooks/useCommentModal";
import Modal from "./Modal";
import Input from "../inputs/Input";
import Button from "../buttons/Button";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import InputStar from "../inputs/InputStar";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useSupabaseClient } from "@supabase/auth-helpers-react";


// comment modal
const CommentModal = () => {
    // get router
    const router = useRouter()
    // get supabase client 
    const supabaseClient = useSupabaseClient()
    // use comment modal
    const commentModal = useCommentModal()

    // get current property id
    const property_id = commentModal.property_id
    // get user id
    const user_id = commentModal.user_id
    // get comment id
    const commentId = commentModal.rate_id
    // get stars
    const starsValue = commentModal.stars
    // get current comment
    const currentComment = commentModal.comment

    // use state to deal with current loading
    const [isLoading, setIsLoading] = useState<boolean>(false)

    // use form hook
    const {
        register, handleSubmit, setValue,
        watch, reset, formState: {
            errors
        }
    } = useForm<FieldValues>({
        defaultValues: {
            propertyStars: 0,
            propertyComment: ''
        }
    })

    // watching from's values 
    const propertyStars = watch('propertyStars') 

    // set user values
    const handleUserValues = (id: string, value: any) => {
        setValue(id, value, {
            shouldValidate: true, shouldDirty: true, shouldTouch: true
        })
    }

    useEffect(() => {
        // if current stars value, set it
        if(starsValue) handleUserValues('propertyStars', starsValue)
        else handleUserValues('propertyStars', 0)
        // if current comment value, set it
        if(currentComment) handleUserValues('propertyComment', currentComment)
        else handleUserValues('propertyComment', '')

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [starsValue, currentComment])

    // update comment handler
    const handleCommentUpdate: SubmitHandler<FieldValues> = async (data) => {
        try {
            // if not comment data
            if(data.propertyComment && data.propertyStars > 0 && commentId) {
                // create record on db
                const {
                    error: supaError
                } = await supabaseClient.rpc('update_my_comment', {
                    comment_data: data.propertyComment,
                    stars_number: data.propertyStars,
                    comment_id: commentId
                })

                // if record insertion error
                if(supaError) {
                    // set is loading to false
                    setIsLoading(false)

                    return toast.error('Comment update error, try again!')
                }

                // refresh router
                router.refresh()
                // toast success msg
                toast.success('Comment updated with success!')
                // reset inputs
                reset()
                // close modal
                commentModal.onClose()
                // set is loading to false
                setIsLoading(false)
            } else {
                // set is loading to false
                setIsLoading(false)
                toast.error('All fields are mandatory!')
            }
        } catch (error) {
            // set is loading to false
            setIsLoading(false)
            // display error msg
            toast.error('Comment update error, try again!')
        }
    }

    // comment handler 
    const handleComment: SubmitHandler<FieldValues> = async (data) => {
        try {
            // if not comment data
            if(data.propertyComment && data.propertyStars > 0) {
                // create record on db
                const {
                    error: supaError
                } = await supabaseClient.from('comments').insert({
                    user_id: user_id,
                    property_id: property_id,
                    stars_value: data.propertyStars,
                    comment: data.propertyComment
                })

                // if record insertion error
                if(supaError) {
                    // set is loading to false
                    setIsLoading(false)

                    return toast.error('Comment error, try again!')
                }

                // refresh router
                router.refresh()
                // toast success msg
                toast.success('Commented with success!')
                // reset inputs
                reset()
                // close modal
                commentModal.onClose()
                // set is loading to false
                setIsLoading(false)
            } else {
                // set is loading to false
                setIsLoading(false)
                toast.error('All fields are mandatory!')
            }
        } catch (error) {
            // set is loading to false
            setIsLoading(false)
            // display error msg
            toast.error('Comment error, try again!')
        }
    }

    // on change modal handler
    const onChangeHandler = (isOpen: boolean) => {
        // if modal is opened
        // close it
        if(isOpen) commentModal.onClose()
    }

    // render content
    return (
        <Modal
            title="Rate"
            description="Rate this property."
            isOpen={commentModal.isOpen}
            onChange={() => onChangeHandler(commentModal.isOpen)}>
            <div className="flex flex-col justify-start items-center h-fit w-[90%]">
                <InputStar value={propertyStars}
                    label="How many starts this property deserves?"
                    setStars={(value) => handleUserValues('propertyStars', value)}
                />
                <Input id="propertyComment"
                    isLabel
                    isTextBox
                    label="Comment"
                    placeholder="Tell us what your think about this property"
                    maxLength={500}
                    register={register}
                    errors={errors}
                    disabled={isLoading}
                    type="text"
                    required
                />
                <Button className="flex justify-center items-center text-xs font-bold rounded-lg text-white
                from-[#9f2809] to-[#c71e02] bg-gradient-to-t shadow-[0_0_0.2rem] shadow-[#00000080] my-8 
                border-[#737373] border-[1px] hover:from-[#c71e02] hover:to-[#c71e02] p-2 h-fit w-[30%]"
                type="submit" onClick={commentId ? handleSubmit(handleCommentUpdate) : handleSubmit(handleComment)}>
                    {
                        commentId ? 'Update' : 'Rate'
                    }
                </Button>
            </div>
        </Modal>
    );
}
 
export default CommentModal;
