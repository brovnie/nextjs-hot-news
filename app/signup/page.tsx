import Form from '@/components/form/Form';
import ProfileForm from '@/components/form/ProfileForm';

interface SearchParams {
  searchParams: {
    step: string;
  };
}

const SignUp = async ({ searchParams }: SearchParams) => {
  const params = await searchParams;
  const step = params.step;
  return (
    <div>
      <h2>Sign up</h2>
      {step === '1' && <Form mode={'signup'} />}
      {step === '2' && <ProfileForm />}
    </div>
  );
};

export default SignUp;
