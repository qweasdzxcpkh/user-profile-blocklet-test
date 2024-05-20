import {
  Avatar,
  Box,
  Button,
  Typography,
  List,
  ListItem,
  ListItemAvatar,
  ListItemIcon,
  ListItemText,
  InputAdornment,
} from '@mui/material';
import MailIcon from '@mui/icons-material/MailOutline';
import AtIcon from '@mui/icons-material/AlternateEmailOutlined';
import AccountIcon from '@mui/icons-material/AccountCircleOutlined';
import PhoneIcon from '@mui/icons-material/PhoneOutlined';

import { useForm } from 'react-hook-form';
import { FormContainer, TextFieldElement } from 'react-hook-form-mui';

import { useMutation, useQueryClient } from '@tanstack/react-query';

import useMediaQueryStyles from '../../hooks/useMediaQueryStyles';
import pcStyles from './Edit.module.scss';
import mobileStyles from './Edit.mobile.module.scss';

const Edit = ({ user, onDisplay }) => {
  const styles = useMediaQueryStyles(mobileStyles, pcStyles);

  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: async params => {
      try {
        await fetch('/api/profile', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(params),
        });
      } catch (err) {
        setError('Update submit failed, please retry.');
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['profile'] });
    },
  });
  const onSubmit = async data => {
    await mutation.mutate(data);
    onDisplay();
  };
  console.log(styles);

  return (
    <Box className={styles.container}>
      <FormContainer FormProps={{ className: styles.form }} defaultValues={user} onSuccess={onSubmit}>
        <Avatar className={styles.Avatar}>{user.name?.[0]}</Avatar>
        <TextFieldElement
          label={'Name'}
          name={'name'}
          required
          InputProps={{
            inputProps: {
              maxlength: 100,
            },
            startAdornment: (
              <InputAdornment position="start">
                <AccountIcon />
              </InputAdornment>
            ),
          }}
        />
        <TextFieldElement
          label={'Handle'}
          name={'handle'}
          disabled
          InputProps={{
            inputProps: {
              maxlength: 100,
            },
            startAdornment: (
              <InputAdornment position="start">
                <AtIcon />
              </InputAdornment>
            ),
          }}
        />
        <TextFieldElement
          label={'Email'}
          name={'email'}
          required
          type="email"
          InputProps={{
            inputProps: {
              maxlength: 100,
            },
            startAdornment: (
              <InputAdornment position="start">
                <MailIcon />
              </InputAdornment>
            ),
          }}
        />
        <TextFieldElement
          label={'Phone Number'}
          name={'phoneNumber'}
          required
          rules={{ pattern: { value: /^1\d{10}$/i, message: 'Wrong number' } }}
          InputProps={{
            inputProps: {
              maxlength: 11,
            },
            startAdornment: (
              <InputAdornment position="start">
                <PhoneIcon />
              </InputAdornment>
            ),
          }}
        />
        <div class={styles.formActions}>
          <Button type={'submit'}>Save</Button>
          <Button onClick={onDisplay}>Cancel</Button>
        </div>
      </FormContainer>
    </Box>
  );
};
export default Edit;
