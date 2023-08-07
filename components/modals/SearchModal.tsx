'use client'

import useSeachModal from "@/hooks/useSeachModal";
import Modal from "./Modal";
import Button from "../buttons/Button";
import Categories from "../navbar/Categories";
import Counter from "../inputs/Counter";
import { useCallback, useEffect, useState } from "react";
import { BiMinus, BiPlus } from "react-icons/bi";
import qs from "query-string";
import { useRouter, useSearchParams } from "next/navigation";
import DatePicker from "../inputs/DatePicker";
import { Range } from "react-date-range";
import LocationSelect from "../inputs/LocationSelect";
import InputBox from "../navbar/InputBox";
import LocalModal from "./LocalModal";
import { RegionType } from "@/types";


// search modal
const SearchModal = () => {
    // use search modal hook
    const searchModal = useSeachModal()

    // guest date range state
    const [guestDateRange, setGuestDateRange] = useState<Range>({
        startDate: new Date(),
        endDate: new Date(),
        key: 'selection'
    })

    // guests count state
    const [guestNumber, setGuestNumber] = useState<number>(0)
    // guest location state
    const [guestLocation, setGuestLocation] = useState<RegionType | null>()
    // open selection modal state
    const [openSelection, setOpenSelection] = useState<string>('')
    // current location label
    const [locationLabel, setLocationLabel] = useState<string>("Select a location (ONLY BRAZILIANS LOCATION AVAILABLE)!")
    // current date label
    const [dateLabel, setDateLabel] = useState<string>("Select the in and out dates!")
    // current user selected date sate
    const [isDateSelection, setIsDateSelection] = useState<boolean>(false)

    // params
    const params = useSearchParams()
    // router
    const router = useRouter()

    useEffect(() => {
        // if user selected a location
        // display the location, else
        // display default label
        if(guestLocation) setLocationLabel(`${guestLocation?.nome}, ${guestLocation?.microrregiao.mesorregiao.UF.sigla}`)
        else setLocationLabel("Select a location (ONLY BRAZILIANS LOCATION AVAILABLE)!")

        // if user selected a date
        // display the date, else
        // display default label
        if(isDateSelection) setDateLabel(`${guestDateRange.startDate?.toLocaleDateString()} - ${guestDateRange.endDate?.toLocaleDateString()}`)
        else setDateLabel("Select the in and out dates!")
    }, [guestLocation, isDateSelection, guestDateRange])

    // on click handler
    const handleClick = useCallback(() => {
        // obj query
        let currentQuery = {}

        // if there's current params
        // parse the params string into obj
        if(params) currentQuery = qs.parse(params.toString())

        // unpack the values inside currentQuery
        // add the category query into it
        const updatedQuery: any = {
            ...currentQuery,
            guestNumber: guestNumber,
            guestRegion: guestLocation?.id.toString(),
            guestLocation: `${guestLocation?.nome}, ${guestLocation?.microrregiao.mesorregiao.UF.sigla}`,
            guestStartDate: guestDateRange.startDate,
            guestEndDate: guestDateRange.endDate
        }

        // add and remove toggle
        // if current guest number is 0, removes it from query
        if(guestNumber === 0) delete updatedQuery.guestNumber
        // if current gust location is null, removes it from query
        if(guestLocation === null) {
            delete updatedQuery.guestRegion
            delete updatedQuery.guestLocation
        }

        // create new url with query
        const url = qs.stringifyUrl({
            url: '/', query: updatedQuery
        }, { skipNull: true })

        // push url
        router.push(url)
        // close modal
        searchModal.onClose()
    }, [guestNumber, guestDateRange, guestLocation, params, router, searchModal])

    // on change modal handler
    const onChangeHandler = (isOpen: boolean) => {
        // if modal is opened
        // close it
        if(isOpen) searchModal.onClose()
    }

    // render content
    return (
        <Modal
            title="Find your destiny"
            description="Living experiences with comfort and leisure."
            isOpen={searchModal.isOpen}
            onChange={() => onChangeHandler(searchModal.isOpen)}>
            <div className="flex flex-col justify-center items-center h-fit w-full">
                <Categories className="flex flex-row gap-5 p-2 mb-6 h-20 w-full overflow-hidden overflow-x-auto" />
                <InputBox className="flex justify-between items-center p-2 my-2 h-fit md:h-14 shadow-[0_0_0.2rem] 
                    shadow-[#00000080] border-[#737373] border-[1px] rounded-lg w-full overflow-hidden
                    flex-col md:flex-row"
                    labelClassName="flex flex-col justify-center items-start h-full w-full md:w-[65%] overflow-hidden"
                    titleClassName="text-black text-sm font-bold h-fit"
                    subtitleClassName="text-[#636363] text-base font-normal h-fit"
                    barClassName="bg-[#737373] h-0 w-0 md:h-[80%] md:w-[1px]"
                    title="Guests"
                    subtitle="How many guests?"
                    childrenClassName="flex justify-center items-center my-2 md:my-0 h-full w-full md:w-[30%]">
                    <Counter contentClassName="flex justify-between items-center h-10 md:h-full w-full"
                        buttonsClassName="flex items-center justify-center aspect-square rounded-lg text-white
                            from-[#9f2809] to-[#c71e02] bg-gradient-to-t shadow-[0_0_0.2rem] shadow-[#00000080] 
                            border-[#737373] border-[1px] h-full hover:from-[#c71e02] hover:to-[#c71e02]"
                        valueClassName="flex items-center justify-center cursor-default h-full w-fit"
                        value={guestNumber}
                        onChange={setGuestNumber}
                        leftIcon={BiMinus}
                        rightIcon={BiPlus}
                    />
                </InputBox>
                <InputBox className="flex justify-between items-center p-2 my-2 h-fit md:h-14 shadow-[0_0_0.2rem] 
                    shadow-[#00000080] border-[#737373] border-[1px] rounded-lg w-full overflow-hidden
                    flex-col md:flex-row"
                    labelClassName="flex flex-col justify-center items-start h-full w-full md:w-[65%] overflow-hidden"
                    titleClassName="text-black text-sm font-bold h-fit"
                    subtitleClassName="text-[#636363] text-base font-normal h-fit"
                    title="Period"
                    subtitle={dateLabel}
                    barClassName="bg-[#737373] h-0 w-0 md:h-[80%] md:w-[1px]"
                    childrenClassName="flex justify-center items-center h-full w-full md:w-[30%]">
                        <Button className="flex justify-center items-center text-sm font-medium rounded-lg text-white
                            from-[#9f2809] to-[#c71e02] bg-gradient-to-t shadow-[0_0_0.2rem] shadow-[#00000080] 
                            border-[#737373] border-[1px] hover:from-[#c71e02] hover:to-[#c71e02] my-2 md:my-8 h-8 
                            md:h-full w-[50%]"
                            onClick={() => {
                                setOpenSelection('period')
                                setIsDateSelection(true)
                            }}>
                            Select
                        </Button>
                </InputBox>
                <InputBox className="flex justify-between items-center p-2 my-2 h-fit md:h-14 shadow-[0_0_0.2rem] 
                    shadow-[#00000080] border-[#737373] border-[1px] rounded-lg w-full overflow-hidden
                    flex-col md:flex-row"
                    labelClassName="flex flex-col justify-center items-start h-full w-full md:w-[65%] overflow-hidden"
                    titleClassName="text-black text-sm font-bold h-fit"
                    subtitleClassName="text-[#636363] text-base font-normal h-fit"
                    title="Destiny"
                    subtitle={locationLabel}
                    barClassName="bg-[#737373] h-0 w-0 md:h-[80%] md:w-[1px]"
                    childrenClassName="flex justify-center items-center h-full w-full md:w-[30%]">
                        <Button className="flex justify-center items-center text-sm font-medium rounded-lg text-white
                        from-[#9f2809] to-[#c71e02] bg-gradient-to-t shadow-[0_0_0.2rem] shadow-[#00000080] 
                        border-[#737373] border-[1px] hover:from-[#c71e02] hover:to-[#c71e02] my-2 md:my-8 h-8 
                        md:h-full w-[50%]" 
                        onClick={() => setOpenSelection('destiny')}>
                            Select
                        </Button>
                </InputBox>
                <Button className="flex justify-center items-center text-base font-bold text-white rounded-lg
                    from-[#751a07] via-[#9f2809] to-[#c71e02] bg-gradient-to-t shadow-[0_0_0.2rem] 
                    shadow-[#00000080] border-[#737373] border-[1px] hover:from-[#751a07] hover:to-[#751a07]
                    my-8 h-14 w-[50%] md:w-[40%]" onClick={handleClick}>
                    Search
                </Button>
            </div>
            {
                openSelection == 'period' && (
                    <LocalModal
                        title="Period"
                        description="Select the in and out dates!"
                        onChange={() => setOpenSelection('')}
                        footer={(
                            <Button className="flex justify-center items-center text-sm font-medium text-white rounded-lg
                                from-[#751a07] via-[#9f2809] to-[#c71e02] bg-gradient-to-t shadow-[0_0_0.2rem] 
                                shadow-[#00000080] border-[#737373] border-[1px] hover:from-[#751a07] hover:to-[#751a07]
                                mt-3 h-7 w-[40%]"
                                onClick={() => setOpenSelection('')}>
                                Close
                            </Button>
                        )}>
                        <DatePicker rangeColors={['#c71e02', '#751a07', '#737373']}
                            direction="vertical"
                            value={guestDateRange}
                            disabledDates={[]}
                            onChange={(value) => setGuestDateRange(value.selection)}
                        />
                    </LocalModal>
                ) 
            }
            {
                openSelection === 'destiny' && (
                    <LocalModal
                        title="Destiny"
                        description="Select location!"
                        onChange={() => setOpenSelection('')}
                        footer={(
                            <Button className="flex justify-center items-center text-sm font-medium text-white rounded-lg
                                from-[#751a07] via-[#9f2809] to-[#c71e02] bg-gradient-to-t shadow-[0_0_0.2rem] 
                                shadow-[#00000080] border-[#737373] border-[1px] hover:from-[#751a07] hover:to-[#751a07]
                                mt-3 h-7 w-[40%]"
                                onClick={() => setOpenSelection('')}>
                                Close
                            </Button>
                        )}>
                        <div className="flex flex-col justify-between items-center h-full w-full">
                            <LocationSelect placeholder="Search for a region (ONLY BRAZILIANS LOCATION AVAILABLE)"
                                onChange={setGuestLocation}
                                value={guestLocation}
                            />
                        </div>
                    </LocalModal>
                )
            }
        </Modal>
    );
}
 
export default SearchModal;
