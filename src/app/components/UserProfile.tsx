import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

const postData: any = {
  id: 11,
  name: 'Om Sharma',
  username: 'Om',
  email: 'om@april.biz',
  address: {
    street: 'Hyderabad',
  },
  phone: '1-770-736-8031 x56442',
  website: 'hildegard.org',
}

const getUsersProfile = async () => {
  const response = await fetch('https://jsonplaceholder.typicode.com/users');
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
};

const addNewUser = async (postData: any) => {
  const response =  await fetch('http://localhost:3001/users', {
    method: 'POST',
    body: JSON.stringify(postData),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  })
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
}


function UserProfile() {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (postData) => addNewUser(postData),
    onMutate: (variable) => console.log('onMutate: A mutation is about to happen', variable),
    onError: (error, variable, context) => console.log('onError', error.message),
    onSuccess: (data, variable, context) => {
      console.log('onSuccess', data);
      queryClient.invalidateQueries({ queryKey: ['users'] });
    }
  });

  const { data, error, isLoading, isSuccess } = useQuery({
    queryKey: ['usersProfile'],
    queryFn: getUsersProfile,
  });

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>An error occurred: {error.message}</p>;

  return (
    <div>
      {mutation.isPending ? <div>data is updating...</div> :
        <>
          {mutation.isError ? (<div>An error occured: {mutation.error.message}</div>) : null}
          {mutation.isSuccess ? (<div>data added successfully</div>) : null}
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
            onClick={() => mutation.mutate(postData)}>
            Add new user
          </button>
        </>
      }
      {data?.map((value: any) => {
        return (
          <div key={value.id} className='mb-4'>
            <li>Name: {value?.name}</li>
            <li>Email: {value?.email}</li>
          </div>
        )
      }
      )}
    </div>
  )
};

export default UserProfile;
