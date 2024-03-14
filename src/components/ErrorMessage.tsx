import { ErrorMessage as RHFErrorMessage } from "@hookform/error-message";

interface Props {
  errors: any;
  name: string;
}

export function ErrorMessage({ errors, name }: Props) {
  return (
    <RHFErrorMessage
      errors={errors}
      name={name}
      render={({ message }) => (
        <p className="text-sm text-red-500">{message}</p>
      )}
    />
  );
}
