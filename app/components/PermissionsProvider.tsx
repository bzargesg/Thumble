import React, {useState, useContext} from "react";

const PermissionsContext = React.createContext<string[] | null>(null);

export const PermissionsProvider: React.FC = ({ children }) => {
	const [permissions, setPermissions] = useState<string[]>(['user.write','user.read']);
	return (
		<PermissionsContext.Provider value={permissions}>
			{children}
		</PermissionsContext.Provider>
	)
}

export const usePermissions = () => {
	const pc = useContext(PermissionsContext);
	if( pc === null){
		throw new Error("usePermissions must be inside of PermissionsProvider");
	}
	const permissions = pc;
	console.log(permissions);
	return pc;
};

interface CanProps{
	permissions?: string[] | string,
}

export const Can: React.FC<CanProps> = (props) => {
	const { children } = props;
	const userPermissions = usePermissions();
	let match = checkMatch(userPermissions, props);
	

	if(match){
		return<>{children}</>
	}else{
		return null;
	}
}

export const Switch: React.FC = ({ children }) => {
	const userPermissions = usePermissions();
	let element: React.ReactNode = null;
	let match = false;
	
	React.Children.forEach(children, child => {
		if(!match && React.isValidElement(child) && child.type === Can){
			element = child;
			match = checkMatch(userPermissions, child.props as CanProps);
		}
	});
	return match ? element : null;
}
const checkMatch = (userPermissions: string[], canProps: CanProps) =>{
	let match = false;
	const { permissions = [] } = canProps;
	const permissionsArr = Array.isArray(permissions)? permissions : [permissions];
	if(permissionsArr.length === 0){
		match = true;
	}else{
		match = permissionsArr.some(p=>userPermissions.includes(p));
	}
	return match;
}