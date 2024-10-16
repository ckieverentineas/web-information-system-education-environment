import React from 'react';
import { List, ListItem, ListItemText, Typography } from '@mui/material';

const CourseList: React.FC<{ courses: any[]; onCourseSelected: (course: any) => void }> = ({ courses, onCourseSelected }) => {
    return (
        <div>
            <Typography variant="h5">Список курсов</Typography>
            <List>
                {courses.map(course => (
                    <ListItem button key={course.id} onClick={() => onCourseSelected(course)}>
                        <ListItemText primary={course.title} />
                    </ListItem>
                ))}
            </List>
        </div>
    );
};

export default CourseList;
