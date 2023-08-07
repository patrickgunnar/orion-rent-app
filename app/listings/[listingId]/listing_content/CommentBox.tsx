'use client'

import Button from "@/components/buttons/Button"
import useCommentModal from "@/hooks/useCommentModal"
import useImage from "@/hooks/useImage"
import { useUser } from "@/hooks/useUser"
import { CommentType } from "@/types"
import Image from "next/image"
import { GrStar } from "react-icons/gr"
import { IoPersonCircleSharp } from "react-icons/io5"


interface CommentBoxProps {
    comment: CommentType
}

// comment box
const CommentBox: React.FC<CommentBoxProps> = ({
    comment
}) => {
    // get current user
    const user = useUser()
    // get comment modal
    const commentModal = useCommentModal()
    // get user image url
    const image_url = useImage(comment.user.image)

    // create stars icon by rate value handler
    const handleStarsValue = (value: number) => {
        // icon array
        const iconArray = []

        // loop from 1 to passed value
        // push 1 start inside the icon array
        for(let i = 1; i <= value; i++) iconArray.push(<GrStar key={i} size={20} />)

        // return icons
        return iconArray
    }

    // update comment handler
    const handleCommentUpdate = () => {
        // if current user's id is the comment user's id
        if(user.userDetails?.id === comment.user_id) {
            // set comment id
            commentModal.setRateId(comment.id)
            // set stars number
            commentModal.setStars(comment.stars_value)
            // set comment
            commentModal.setComment(comment.comment)
            // open modal
            commentModal.onOpen()
        }
    }

    // render elements
    return (
        <div className="flex flex-col justify-between items-center drop-shadow-[0_0_0.1rem] shadow-[#00000080] 
        from-[#FFFAFA] via-[#F0EBEB] to-[#E1DCDC] bg-gradient-to-b rounded-lg p-4 h-fit w-full">
            <div className="flex flex-row justify-between items-center h-fit w-full">
                <div className="flex flex-row justify-start items-center gap-2 h-fit w-full">
                    {
                        image_url ? (
                            <div className="relative flex w-[25%] aspect-square rounded-full drop-shadow-[0_0_0.1rem] 
                            shadow-[#00000080] border-[#737373] border-[1px] overflow-hidden">
                                <Image className="object-cover"
                                    src={image_url}
                                    alt={comment.user.name}
                                    fill
                                />
                            </div>
                        ) : (
                            <div className="relative flex w-[25%] aspect-square mx-1 overflow-hidden">
                                <IoPersonCircleSharp className="h-full w-full" />
                            </div>
                        )
                    }
                    <div className="flex flex-col justify-start items-center h-fit w-[73%]">
                        <div className="flex justify-start items-center text-base font-medium pt-1 h-fit w-full">
                            {comment.user.name}
                        </div>
                        <div className="flex justify-start items-center text-gray-600 text-sm font-normal pb-2 h-fit w-full">
                            {
                                new Date(comment.created_at).toLocaleDateString()
                            }
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex justify-center items-center p-2 h-fit w-full">
                {
                    handleStarsValue(comment.stars_value)
                }
            </div>
            <div className="flex justify-start items-center text-base text-left font-normal px-4 h-fit w-full">
                {comment.comment}
            </div>
            {
                user.userDetails?.id === comment.user_id && (
                    <Button className="flex justify-center items-center text-xs font-bold rounded-lg text-white
                    from-[#9f2809] to-[#c71e02] bg-gradient-to-t shadow-[0_0_0.2rem] shadow-[#00000080] mt-8 
                    border-[#737373] border-[1px] hover:from-[#c71e02] hover:to-[#c71e02] p-2 h-fit w-[30%]"
                    onClick={handleCommentUpdate}>
                        Edit
                    </Button>
                )
            }
        </div>
    );
}
 
export default CommentBox;
