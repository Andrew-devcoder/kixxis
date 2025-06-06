import { Switch } from '@headlessui/react';

type Props = {
	value: boolean;
	onChange: (value: boolean) => void;
};

export default function SwitchActive({ value, onChange }: Props) {
	return (
		<Switch
			checked={value}
			onChange={() => onChange(!value)}
			className={`ml-auto group relative flex h-7 w-14 cursor-pointer rounded-full p-1 transition-colors ${
				value ? 'bg-green-500' : 'bg-white/10'
			} focus:not-data-focus:outline-none data-focus:outline data-focus:outline-white`}
		>
			<span
				aria-hidden="true"
				className={`pointer-events-none inline-block size-5 rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out ${
					value ? 'translate-x-7' : 'translate-x-0'
				}`}
			/>
		</Switch>
	);
}
