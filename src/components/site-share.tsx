import {Site} from "@prisma/client";
import {useResource} from "../hooks/use-resource";
import {getApiShareEndpoint} from "../routes";
import {ShareHandlerGetResponse} from "../../pages/api/projects/[project]/sites/[site]/share";
import {
    Button,
    CircularProgress,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle
} from "@mui/material";
import Link from "next/link";
import {useCallback, useState} from "react";
import {getAxios} from "../utils/get-axios";
import {toast} from "react-toastify";
import {THEME_NAME} from "../../config.web";

export type SiteShareProps = {
    site: Site;
}

export const SiteShare = ({site}: SiteShareProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false)
    const api = useResource<ShareHandlerGetResponse>({url: getApiShareEndpoint(site.projectId, site.id)});

    const removeShare = useCallback(() => {
        setIsLoading(true);
        getAxios()
            .delete(getApiShareEndpoint(site.projectId, site.id))
            .then(() => {
                return api.mutate({url: null})
            })
            .then(() => {
                setIsLoading(false);
                toast.info(`Sharing disabled`, {
                    theme: THEME_NAME
                });
            })
            .catch(() => {
                setIsLoading(false)
            })
    }, [site,])

    const generateSharable = useCallback(() => {
        setIsLoading(true);
        getAxios()
            .post<ShareHandlerGetResponse>(getApiShareEndpoint(site.projectId, site.id))
            .then(({data}) => {
                return api.mutate(data)
            })
            .then(() => {
                setIsLoading(false);
                toast.info(`Sharing url generated`, {
                    theme: THEME_NAME
                });
            })
            .catch(() => {
                setIsLoading(false)
            })
    }, [site])

    if (!api.data) {
        return null;
    }

    return <>
        {isLoading ?
            <CircularProgress size={'small'}/> :
            <Button onClick={() => setIsOpen(true)}>
                Share
            </Button>}

        <Dialog
            open={isOpen}
            onClose={() => setIsOpen(false)}>
            <DialogTitle id="responsive-dialog-title">
                Share Report
            </DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Generate a unique URL to view this report without the requirement of a login.
                </DialogContentText>
            </DialogContent>

            <DialogActions>
                {api.data.url && <>
                    <Button autoFocus onClick={removeShare} color={'error'}>
                        Remove share
                    </Button>
                    <Link href={api.data!.url!} target={'_blank'}>
                        <Button variant={'text'}>
                            Open Link
                        </Button>
                    </Link></>}

                {!api.data.url &&
                    <Button autoFocus onClick={generateSharable}>
                        Generate shareable link
                    </Button>}
            </DialogActions>
        </Dialog>
    </>
}