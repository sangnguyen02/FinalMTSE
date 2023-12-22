import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Box, Button, Typography } from '@mui/material'
import { getAllMajors } from '../../../redux/majorRelated/majorHandle';
import { useNavigate } from 'react-router-dom';
import { PurpleButton } from '../../../components/buttonStyles';
import TableTemplate from '../../../components/TableTemplate';

const ChooseMajor = ({ situation }) => {
    const navigate = useNavigate()
    const dispatch = useDispatch();

    const { majorsList, loading, error, getresponse } = useSelector((state) => state.major);
    const { currentUser } = useSelector(state => state.user)

    useEffect(() => {
        dispatch(getAllMajors(currentUser._id, "Major"));
    }, [currentUser._id, dispatch]);

    if (error) {
        console.log(error)
    }

    const navigateHandler = (majorID) => {
        if (situation === "Teacher") {
            navigate("/Admin/teachers/chooseproject/" + majorID)
        }
        else if (situation === "Project") {
            navigate("/Admin/addproject/" + majorID)
        }
    }

    const majorColumns = [
        { id: 'name', label: 'Major Name', minWidth: 170 },
    ]

    const majorRows = majorsList && majorsList.length > 0 && majorsList.map((major) => {
        return {
            name: major.majorName,
            id: major._id,
        };
    })

    const MajorButtonHaver = ({ row }) => {
        return (
            <>
                <PurpleButton variant="contained"
                    onClick={() => navigateHandler(row.id)}>
                    Choose
                </PurpleButton>
            </>
        );
    };

    return (
        <>
            {loading ?
                <div>Loading...</div>
                :
                <>
                    {getresponse ?
                        <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginTop: '16px' }}>
                            <Button variant="contained" onClick={() => navigate("/Admin/addmajor")}>
                                Add Major
                            </Button>
                        </Box>
                        :
                        <>
                            <Typography variant="h6" gutterBottom component="div">
                                Choose a major
                            </Typography>
                            {Array.isArray(majorsList) && majorsList.length > 0 &&
                                <TableTemplate buttonHaver={MajorButtonHaver} columns={majorColumns} rows={majorRows} />
                            }
                        </>}
                </>
            }
        </>
    )
}

export default ChooseMajor