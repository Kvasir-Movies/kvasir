"""Add preference_type to movie_preferences

Revision ID: b63f44d5fcdb
Revises: 863518d37297
Create Date: 2019-03-30 16:29:34.214580

"""
from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import postgresql

from app.models import PreferenceTypes


# revision identifiers, used by Alembic.
revision = "b63f44d5fcdb"
down_revision = "863518d37297"
branch_labels = None
depends_on = None


def upgrade():
    preference_enum = postgresql.ENUM("positive", "negative", name="preference_type")
    preference_enum.create(op.get_bind())
    op.add_column(
        "movie_preferences",
        sa.Column(
            "preference_type", sa.Enum("positive", "negative", name="preference_type"),
        ),
    )
    op.execute("UPDATE movie_preferences SET preference_type = 'positive'")
    op.alter_column("movie_preferences", "preference_type", nullable=False)


def downgrade():
    op.drop_column("movie_preferences", "preference_type")
