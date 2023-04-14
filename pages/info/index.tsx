import { GetServerSideProps } from 'next';
import { Layout } from '../../src/components/layout';
import React from 'react';
import { getNavigation, NavigationEntry } from '../../src/utils/get-navigation';
import { List, ListItem, ListItemText, Typography } from '@mui/material';
import { version } from '../../package.json';
import Link from 'next/link';

export type InfoProps = {
  navigation: NavigationEntry[];
  dbUrl: string;
  minioHost: string;
}

export const getServerSideProps: GetServerSideProps<InfoProps> = async () => {
  const navigation = await getNavigation();
  const minioHost = process.env.MINIO_HOST as string;
  const dbUrl = new URL(process.env.DATABASE_URL as string).host;

  return {
    props: {
      navigation,
      minioHost,
      dbUrl
    }
  };
};

export const ReportsPage = ({navigation, minioHost, dbUrl}: InfoProps) => {
  return <Layout navigation={navigation} showBack={false} title={'Info'}
    actions={<>
    </>}>
    <List>
      <ListItem>
        <ListItemText primary={<Typography color={'textPrimary'}>Code</Typography>}
          secondary={<Link href={'https://github.com/faebeee/lighthouse-inspector'} target={'_blank'}><Typography
            color={'primary'}>Github</Typography></Link>} />
      </ListItem>

      <ListItem>
        <ListItemText primary={<Typography color={'textPrimary'}>Version</Typography>} secondary={version} />
      </ListItem>

      <ListItem>
        <ListItemText primary={<Typography color={'textPrimary'}>MINIO Host</Typography>} secondary={minioHost} />
      </ListItem>

      <ListItem>
        <ListItemText primary={<Typography color={'textPrimary'}>DB Host</Typography>} secondary={dbUrl} />
      </ListItem>
    </List>
  </Layout>;
};

export default ReportsPage;
