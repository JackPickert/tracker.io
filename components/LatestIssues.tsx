import prisma from '@/prisma/client';
import { Avatar, Card, Flex, Heading, Table } from '@radix-ui/themes';
import Link from 'next/link';
import React from 'react'
import { IssueStatusBadge } from '.';

const LatestIssues = async () => {
    const issues = await prisma.issue.findMany({
        orderBy: { createdAt: 'desc' },
        take: 5,
        include: {
            assignedToUser: true
        }
    })
    return (
        <Card>
            <Heading size={'4'} mb={'4'}>Latest Issues</Heading>
            <Table.Root>
                <Table.Body>
                    {issues.map(issue => (
                        <Table.Row key={issue.id}>
                            <Table.Cell>
                                <Flex>
                                    <Flex direction={'column'} align={'start'} gap={'2'} >
                                        <Link href={`/issues/${issue.id}`}>{issue.title}</Link>
                                        <IssueStatusBadge status={issue.status} />
                                    </Flex>
                                    {issue.assignedToUserId && (<Avatar src={issue.assignedToUser?.image!} fallback={'?'} size={'2'} radius='full' />)}
                                </Flex>
                            </Table.Cell>
                        </Table.Row>
                    ))}
                </Table.Body>
            </Table.Root>
        </Card>
    )
}

export default LatestIssues;