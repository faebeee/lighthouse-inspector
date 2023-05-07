import { GetServerSideProps } from 'next'
import { Layout } from '../../src/components/layout'
import React from 'react'
import { getNavigation, NavigationEntry } from '../../src/utils/get-navigation'
import { Badge, Button, List, ListItem, ListItemText, Typography } from '@mui/material'
import { version } from '../../package.json'
import Link from 'next/link'
import { getServerSession } from 'next-auth'
import { authOptions } from '../api/auth/[...nextauth]'
import { getUserByUsername } from '../../src/server/lib/user-service'
import { getAxios } from '../../src/utils/get-axios'
import { useResource } from '../../src/hooks/use-resource'
import { useBeacon } from '../../src/hooks/use-beacon'
import { BEACON_KEY } from '../../config'
import { Site } from '@prisma/client'

export type InfoProps = {
  navigation: NavigationEntry[];
  dbUrl: string;
  minioHost: string;
  minioPort: string;
  showAuditButton: boolean;
}

export const getServerSideProps: GetServerSideProps<InfoProps> = async (context) => {
  const navigation = await getNavigation()
  const minioHost = process.env.MINIO_HOST as string
  const minioPort = process.env.MINIO_PORT as string
  const dbUrl = new URL(process.env.DATABASE_URL as string).host
  const session = await getServerSession(context.req, context.res, authOptions)
  if (!session) {
    return {
      notFound: true
    }
  }

  const user = await getUserByUsername(session.user!.name!)
  if (!user) {
    return {
      notFound: true
    }
  }

  return {
    props: {
      navigation,
      minioHost,
      minioPort,
      dbUrl,
      showAuditButton: user.can_start_audit
    }
  }
}

export const InfoPage = ({navigation, minioHost,minioPort, dbUrl, showAuditButton}: InfoProps) => {
  const api = useResource<Site[]>({url: '/api/inspect'}, 5000)
  const auditProgress = useBeacon(BEACON_KEY.AUDIT_PROGRESS, 5000)

  const onClickAudit = () => {
    getAxios()
      .post('/api/inspect')
  }

  return <Layout navigation={navigation} showBack={false} title={'Info'}
    actions={<>
    </>}>
    <List>

      {showAuditButton && <>
        {(api.data?.length ?? 0) > 0 && <ListItem>
          <ListItemText primary={<Typography color={'textPrimary'}>Audit</Typography>}
            secondary={<Badge color={'success'} variant={'dot'}>
              <Typography variant={'body2'}>Running: {auditProgress.value}</Typography>
            </Badge>} />
        </ListItem>}

        {!api.data?.length && <ListItem>
          <ListItemText primary={<Typography color={'textPrimary'}>Audit</Typography>}
            secondary={<Button onClick={onClickAudit} variant={'contained'} size={'small'}>Start</Button>} />
        </ListItem>}

      </>}

      <ListItem>
        <ListItemText primary={<Typography color={'textPrimary'}>Code</Typography>}
          secondary={<Link href={'https://github.com/faebeee/lighthouse-inspector'} target={'_blank'}><Typography
            color={'primary'}>Github</Typography></Link>} />
      </ListItem>

      <ListItem>
        <ListItemText primary={<Typography color={'textPrimary'}>Docker Hub</Typography>}
          secondary={<Link href={'https://hub.docker.com/repository/docker/faebeee/web-audit-web/general'} target={'_blank'}><Typography
            color={'primary'}>Web App</Typography></Link>} />
      </ListItem>

      <ListItem>
        <ListItemText primary={<Typography color={'textPrimary'}>Docker Hub</Typography>}
          secondary={<Link href={'https://hub.docker.com/repository/docker/faebeee/web-audit-cron/general'} target={'_blank'}><Typography
            color={'primary'}>Cron</Typography></Link>} />
      </ListItem>

      <ListItem>
        <ListItemText primary={<Typography color={'textPrimary'}>Version</Typography>} secondary={
          <Link href={'https://github.com/faebeee/lighthouse-inspector/tags'} target={'_blank'}><Typography
            color={'primary'}>{version}</Typography></Link>
        } />
      </ListItem>

      <ListItem>
        <ListItemText primary={<Typography color={'textPrimary'}>MINIO Host</Typography>} secondary={
          <Link href={`http://${minioHost}:${minioPort}`} target={'_blank'}>
            <Typography color={'primary'}>{minioHost}</Typography>
          </Link>} />
      </ListItem>

      <ListItem>
        <ListItemText primary={<Typography color={'textPrimary'}>DB Host</Typography>} secondary={dbUrl} />
      </ListItem>
    </List>
  </Layout>;
};

export default InfoPage
