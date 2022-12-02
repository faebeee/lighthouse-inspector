import {
    Button,
    Card,
    CardActions,
    CardContent,
    CardMedia,
    Grid,
    Stack,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography
} from "@mui/material";
import { ReportResult } from "../../pages/reports/[project]";
import Link from "next/link";

export type ReportGridProps = {
    reports: Record<string, ReportResult[]>;
    title: string;
}

export const ReportGrid = ({ reports, title }: ReportGridProps) => {
    return <Stack spacing={ 2 }>
        <Typography variant={ 'h3' } color={ 'white' }>{ title }</Typography>
        <Grid container spacing={ 2 }>
            { Object.entries(reports).map(([ domain, result ]) => {
                const report = result[result.length - 1] as ReportResult;
                return (
                    <Grid key={ domain } item xs={ 12 } lg={ 6 } xl={ 3 }>
                        <Card>
                            <CardMedia
                                component="img"
                                height="240"
                                image={ report.imageBase64 }
                            />
                            <CardContent>
                                <Typography variant={ 'h6' }>{ report.projectName }</Typography>
                                <Typography>{ report.finalUrl }</Typography>
                                <TableContainer>
                                    <Table size="small">
                                        <TableHead>
                                            <TableRow>
                                                <TableCell>Performance</TableCell>
                                                <TableCell>Accessibility</TableCell>
                                                <TableCell>Best Practices</TableCell>
                                                <TableCell>SEO</TableCell>
                                                <TableCell>PWA</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            <TableRow>
                                                <TableCell>{ report.performance }</TableCell>
                                                <TableCell>{ report.accessibility }</TableCell>
                                                <TableCell>{ report.bestPractices }</TableCell>
                                                <TableCell>{ report.seo }</TableCell>
                                                <TableCell>{ report.pwa }</TableCell>
                                            </TableRow>
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            </CardContent>
                            <CardActions>
                                <Link href={ `/domain/${ report.domain }` }>
                                    <Button color={ 'secondary' } variant={ 'text' }>Open Domain</Button>
                                </Link>
                                <Link href={ `/reports/${ report.projectName }` }>
                                    <Button color={ 'secondary' } variant={ 'text' }>Open Project</Button>
                                </Link>
                                <Link target={ '_blank' }
                                    href={ `/api/${ report.projectName }/${ report.htmlReportFile }` }>
                                    <Button color={ 'secondary' } variant={ 'text' }>Open Report</Button>
                                </Link>
                            </CardActions>
                        </Card>
                    </Grid>
                )
            }) }
        </Grid>
    </Stack>;
}
