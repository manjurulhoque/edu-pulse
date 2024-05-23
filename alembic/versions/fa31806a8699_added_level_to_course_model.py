"""Added level to course model

Revision ID: fa31806a8699
Revises: 
Create Date: 2024-05-23 00:22:02.282201

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = 'fa31806a8699'
down_revision: Union[str, None] = None
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    op.add_column('courses', sa.Column('level', sa.String(length=20), nullable=True))


def downgrade() -> None:
    op.drop_column('courses', 'level')
