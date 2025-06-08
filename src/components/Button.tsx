// Import the React and the Button component from the MUI library
import React from 'react';
import Button from '@mui/material/Button';

// Defining a TypeScript interface to describe the props our CustomButton will accept.
// Why is this interface necessary?
// 1. It provides a way to describe the props that our component will accept.
// 2. It provides a way to validate the props that are passed to the component.
// 3. It provides a way to document the props that the component accepts.
// 4. It provides a way to enforce the type of the props that are passed to the component.
// 5. It provides a way to provide default values for the props that are not passed to the component.
// 6. It provides a way to provide a type for the props that are passed to the component.
// 7. It provides a way to provide a default value for the props that are not passed to the component.
interface CustomButtonProps {
    // The text that will be displayed on the button
    text: string;

    // 'onClick' is an optional callback function to be triggered when the button is clicked.
    onClick?: () => void;

    // The color of the button
    // 'color' controls the theme color of the button. It defaults to 'primary' if not specified.
    color?: 'primary' | 'secondary' | 'error' | 'warning' | 'info' | 'success';

    // 'size' controls the overall dimensions of the button.
    // - 'small', 'medium' (default), or 'large'
    size?: 'small' | 'medium' | 'large';

    // The variant of the button
    // 'variant' defines the visual style of the button:
    // - 'text' (no border or background),
    // - 'outlined' (border only),
    // - 'contained' (filled background). Default is 'contained'.
    variant?: 'contained' | 'outlined' | 'text';
}

// Defining the CustomButton functional component using React.FC (Function Component)
// This ensures that the component adheres to React's typing system and takes props of type CustomButtonProps as defined above.
const CustomButton: React.FC<CustomButtonProps> = ({
    text,                     // Destructure and use the 'text' prop inside the button label
    onClick,                  // Optional click handler
    color = 'primary',        // Set default color to 'primary' if none is provided
    variant = 'contained',    // Set default variant to 'contained'
    size = 'medium'           // Set default size to 'medium'
}) => {
    // Return the actual Material UI Button component, applying all the props we've passed in.
    return (
        <Button
            variant={variant} // Apply the variant style
            color={color}     // Apply the theme color
            size={size}       // Apply the size
            onClick={onClick} // Attach the click event handler if one exists
        >
            {/* Display the text passed as a prop inside the button */}
            {text}
        </Button>
    );
};

// Export the component so that it can be imported and used in other parts of the app.
export default CustomButton;



// Testing the button component in App.tsx 
// const App: React.FC = () => {
//     const handleClick = () => {
//         alert("Button clicked!");
//     };

//     return (
//         <div style={{
//             display: 'flex',
//             flexDirection: 'column',
//             gap: '1rem',
//             alignItems: 'center',
//             marginTop: '2rem'
//         }}>
//             <h2>Button Variations</h2>

//             {/* Default Button */}
//             <CustomButton text="Default Button" onClick={handleClick} />

//             {/* Different Colors */}
//             <div style={{ display: 'flex', gap: '1rem' }}>
//                 <CustomButton text="Primary" color="primary" onClick={handleClick} />
//                 <CustomButton text="Secondary" color="secondary" onClick={handleClick} />
//                 <CustomButton text="Success" color="success" onClick={handleClick} />
//                 <CustomButton text="Error" color="error" onClick={handleClick} />
//             </div>

//             {/* Different Sizes */}
//             <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
//                 <CustomButton text="Small" size="small" onClick={handleClick} />
//                 <CustomButton text="Medium" size="medium" onClick={handleClick} />
//                 <CustomButton text="Large" size="large" onClick={handleClick} />
//             </div>

//             {/* Different Variants */}
//             <div style={{ display: 'flex', gap: '1rem' }}>
//                 <CustomButton text="Contained" variant="contained" onClick={handleClick} />
//                 <CustomButton text="Outlined" variant="outlined" onClick={handleClick} />
//                 <CustomButton text="Text" variant="text" onClick={handleClick} />
//             </div>
//         </div>
//     );
// };
